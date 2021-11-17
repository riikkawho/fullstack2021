const Blog = require('../models/blog')
const User = require('../models/user')

const testBlogs = [
  {
    title: 'Old Title',
    author: 'Dusty Author',
    url: 'https://oldurl.com',
    likes: '5',
    user: '61956f4dae34f265efc7c6e5'
  },
  { title: 'Interesting Title',
    author: 'Cool Author',
    url: 'https://neaturl.com',
    likes: '50',
    user: '61956f4dae34f265efc7c6e5'
  }
]

const idToFork = async () => {
  const blog = new Blog({
    title: 'Removable Title',
    author: 'John VanIshing',
    url: 'wwwillbegone.com',
    likes: '1',
    user: '619570dcb92e8d8407bf328c'
  })
  const response = await blog.save()

  return response
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  testBlogs, blogsInDb, idToFork, usersInDb
}