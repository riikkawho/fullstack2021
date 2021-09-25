require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Contact = require('./models/contact')

app.use(express.json()),
app.use(express.static('build'))
morgan.token('body', (request) => { 
  return JSON.stringify(request.body) 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

app.get('/info', (request, response) => {
  const date = Date()
  Contact.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> ${date}`)
  })
})

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {

  Contact.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {

  const body = request.body 

  if (!request.body.name)
    return response.status(400).json({
      error: 'Contact name missing'
    })

  if (!request.body.number)
    return response.status(400).json({
      error: 'Contact number missing'
    })

  const person =  new Contact({
    name: body.name,
    number: body.number,
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }

  const opts = { runValidators: true, new: true }
  Contact.findByIdAndUpdate(request.params.id, person, opts)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => 
      response.status(204).end()
    )
    .catch(error => next(error))
})

const errorHandler = (error, response) => {
  console.error(error.message)
  console.log(error)

  if (error.name == 'CastError') {
    return response.status(400).send({ error: 'bad id' })
  } 
  if (error.name == 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }  

  return (
    response.status(500).send({error: 'Something unexpected happened, try again' })
  )
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})