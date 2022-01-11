import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders default content', () => {
  const blog = {
    title: 'Testing React components is new to me',
    author: 'Newbie Coder',
    url: 'www.newurl.com'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blogDef')
  expect(div).toHaveTextContent(
    'Testing React components is new to me'
  )
  expect(div).toHaveTextContent(
    'Newbie Coder'
  )
  expect(div).not.toHaveTextContent(
    'www.newurl.com'
  )
  expect(div).not.toHaveTextContent(
    'Likes'
  )
})

test('renders url and likes, when toggle is called', () => {
  const blog = {
    title: 'Testing React components is new to me',
    author: 'Newbie Coder',
    url: 'www.newurl.com'
  }

  const mockFn = jest.fn()

  const component = render(
    <Blog blog={blog} onClick={mockFn}/>
  )

  const button = component.getByText('Show')
  fireEvent.click(button)

  const div = component.container.querySelector('.blog')

  setTimeout(() => {
    expect(mockFn.mock.calls.length).toBe(1)
  }, 3000)

  expect(div).toHaveTextContent(
    'Testing React components is new to me'
  )
  expect(div).toHaveTextContent(
    'Newbie Coder'
  )
  expect(div).toHaveTextContent(
    'www.newurl.com'
  )
  expect(div).toHaveTextContent(
    'Likes'
  )
})

test('clicking like twice calls the function twice', () => {
  const blog = {
    title: 'Testing React components is new to me',
    author: 'Newbie Coder',
    url: 'www.newurl.com'
  }
  const mockFn = jest.fn()

  const component = render(
    <Blog blog={blog} onClick={mockFn}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  setTimeout(() => {
    expect(mockFn.mock.calls.length).toBe(2)
  }, 3000)
})