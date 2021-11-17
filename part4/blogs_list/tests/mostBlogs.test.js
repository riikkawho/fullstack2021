/* eslint-disable no-undef */
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
  const blogs = [
    {
      _id: '614f5af2e502617790003a5d',
      title: 'String',
      author: 'String',
      url: 'String',
      likes: 6,
      __v: 0
    },
    {
      _id: '614f6bc1e502617790003a65',
      title: 'Stringi',
      author: 'String',
      url: 'String',
      likes: 2,
      __v: 0
    },
    {
      _id: '614f6c2de502617790003a69',
      title: 'Stringinen',
      author: 'String',
      url: 'String',
      likes: 2,
      __v: 0
    },
    {
      _id: '61502ad45b2cee311df13a07',
      title: 'Testi testi',
      author: 'riikkawho',
      url: 'testi',
      likes: 2,
      __v: 0
    },
    {
      _id: '615039b2598ad6e8836efb7d',
      title: 'Testi 2',
      author: 'riikkawho',
      url: 'testi',
      likes: 2,
      __v: 0
    }
  ]

  test('the most productive author is String', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({author: 'String', blogs: 3})
  })
})
