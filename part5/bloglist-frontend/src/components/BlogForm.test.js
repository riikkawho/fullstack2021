import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BlogForm } from './BlogForm'

test('<BlogForm /> calls function on submit and receives intended values', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm onSubmit={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'Miss Difculty' }
  })
  fireEvent.change(url, {
    target: { value: 'www.formsintest.com' }
  })
  fireEvent.submit(form)

  setTimeout(() => {
    expect(createBlog.mock.calls.length).toBe(1)
  }, 3000)
  setTimeout(() => {
    console.log(createBlog.mock.calls)
  }, 3000)
  setTimeout(() => {
    expect(createBlog.mock.calls[0][0].content).toBe('testing of forms could be easier' )
  }, 3000)
  setTimeout(() => {
    expect(createBlog.mock.calls[1][0].content).toBe('Miss Difculty')
  }, 3000)
  setTimeout(() => {
    expect(createBlog.mock.calls[2][0].content).toBe('www.formsintest.com' )
  }, 3000)
})