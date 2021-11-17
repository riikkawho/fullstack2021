/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

let token

beforeAll(async () => {
  login = await api.post('/api/login').send({ username: 'root', password: 'salane' })
  token = login.body.token.toString()
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.testBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }n
}, 10000)

describe('Testing gets and posts', () => {

  test('getting all blogs succeeds and content-type is json', async () => {
    const response = await api.get('/api/blogs')
      .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(helper.testBlogs.length)
  })

  test('id is id and not _id', async () => {
    const response = await helper.blogsInDb()
    const ids = response.map(res => res.id)
    expect(ids).toBeDefined()
  })

  test('posting a new blog succeeds', async () => {
    const newBlog = {
      title: 'New Title',
      author: 'Fresh Author',
      url: 'https://newurl.com',
      likes: '100',
      user: '619537e849fd5feacdabc21d'
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
    
    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length + 1)
    expect(contents).toContain('New Title')
  }, 10000)
})

describe('If properties are missing', () => {

  test('missing likes equals 0', async () => {

    const newBlog = {
      title: 'Unlikeable Title',
      author: 'Dull Author',
      url: 'boring.com', 
      user: '619537e849fd5feacdabc21d'
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

    const response = await helper.blogsInDb()
    const contents = response.map(blog => blog.likes)

    expect(contents[2]).toBe(0)

  }, 10000)

  test('missing title or url gives 400 Bad request', async () => {

    const newBlog = {
      author: 'Non Existing'
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
  }, 10000)
})

describe('Forking existing object:', () => {

  test('deleting by id works', async () => {
    const info = await helper.idToFork()
    const user = info.user.toString()

    const deletedId = info.id.toString()
    expect(deletedId).toEqual(expect.any(String))

    console.log(user)


    await api
      .delete(`/api/blogs/${deletedId}`)
      .set('Authorization', `bearer ${token}`)

    console.log(jwt.decode(token))

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
  }, 10000)

  test('updating by id works', async () => {
    const info = await helper.idToFork()
    const newBlogId = info.id.toString()
    
    const infoToUpdate = {
      likes: '5'
    }

    await api
      .put(`/api/blogs/${newBlogId}`)
      .set('Authorization', `bearer ${token}`)
      .send(infoToUpdate)
  
    const updatedObj = await Blog.findById({_id: newBlogId})
    console.log(updatedObj)
    expect(updatedObj.likes).toBe(5)
  })
})

afterAll(() => {
  mongoose.connection.close()
})