const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {author: 1, title: 1, url:1})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})

  if (!body.username | !body.password) {
    return response.status(400).json({ error: 'Username and password required' })
  }
  if (body.username.length < 3 | body.password.length < 3) {
    return response.status(400).json({ error: 'Username and password must be at least 3 characters long' })
  }
  if (users.some(user => user.username === body.username)) {
    return response.status(400).json({ error: `Username ${body.username} already exists, please pick another one` })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      name: body.name,
      username: body.username,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
  }
})

module.exports = usersRouter