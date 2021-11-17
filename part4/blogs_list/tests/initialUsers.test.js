/* eslint-disable no-undef */
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const mongoose = require('mongoose')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salane', 10)
    const user = new User({ username: 'root', passwordHash, blogs: [] })

    await user.save()
  }, 10000)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Riikka',
      name: 'Riikka K',
      password: 'tosisalane'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 10000)

  test('creation fails if username or password not given and error messages accordingly', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      name: 'Ritu',
      password: 'tosisalane'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const names = usersAtEnd.map(u => u.name)
    expect(names).not.toContain(newUser.name)
  }, 10000)

  test('creation fails if username or password is too short and error messages accordingly', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      name: 'Ritu',
      username: 'RJK',
      password: 'sh'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('at least')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  }, 10000)

  test('creation fails if name already exists and error messages accordingly', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      name: 'Ritu',
      username: 'root',
      password: 'tosisalane'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('exists')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  }, 10000)
})

afterAll(() => {
  mongoose.connection.close()
})