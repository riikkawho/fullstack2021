const { request } = require('express')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const contactName = process.argv[3]
const contactNumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.m3p3k.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact ({
  name: contactName,
  number: contactNumber,
})

if (contactName, contactNumber)
    contact.save().then(result => {
        console.log(`Saved new contact: Name: ${contactName} Number: ${contactNumber} to Phonebook`)
        mongoose.connection.close()
    })

else {
    Contact.find({}).then(result => {
        result.forEach(contact => {
        console.log(contact)
        mongoose.connection.close()
    })
})}