import React, { useState } from 'react'
import { create } from '../services/blogs'

export const BlogForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  //const [message, setMessage] = useState(null)



  const submitPost = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await create({
        title, author, url,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      props.messageAdd(title, author)

      props.onSubmitComplete(newBlog)
    }
    catch (exception) {
      console.log(exception)
      props.messageErr()
      setTimeout(() => {
        props.messageErr(null)
      }, 3000)
    }
  }

  return (
    <div className='form'>
      <form onSubmit={submitPost}>
        <h4>Post a new Blog</h4>
        <label>Title:</label>
        <input id='title' type={'text'} name={'title'} value={title} onChange={({ target }) => setTitle(target.value)}/>
        <br/>
        <label>Author:</label>
        <input id='author' type={'text'} name={'author'} value={author} onChange={({ target }) => setAuthor(target.value)}/>
        <br/>
        <label>URL:</label>
        <input id='url' type={'text'} name={'url'} value={url} onChange={({ target }) => setUrl(target.value)}/>
        <br/>
        <button id='submit' className='details' type={'submit'}>Submit</button>
      </form>
    </div>
  )
}