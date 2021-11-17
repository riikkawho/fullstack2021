/* eslint-disable no-undef */
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const emptyList = []

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

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
    
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
  
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of all is 14', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(14)
  })
})