import React, { useState } from 'react'
import { sendLike, deleteBlog } from '../services/blogs'


const Blog = ({ onDelete, blog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes || 0)

  const toggle = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const totalLikes = likes + 1
    await sendLike(blog.id, { ...blog, likes: totalLikes })
    setLikes(totalLikes)
  }

  const deleteOne = async () => {
    if (window.confirm(`Are you sure you want to delete blog ${blog.title} from the list?`)){
      onDelete(blog.id)
      await deleteBlog(blog.id)
    }
  }

  if (!visible){
    return (
      <div>
        <div id='blogDef' className='blogDef'>
          {blog.author}: {blog.title}
          <button id='show' className='details' onClick={toggle}>Show</button>
          <button id='like' className='like' onClick={addLike}>like</button>
          {blog.user && blog.user.id === user.id
            ? <button className='delete' onClick={deleteOne}>X</button>
            : null}
        </div>
      </div>
    )
  }
  return (
    <div id='blog' className='blog'>
      {blog.author}: {blog.title}
      {blog.user && blog.user.id === user.id
        ? <button id='delete' className='undo' onClick={deleteOne}>delete</button>
        : null}
      <br/>
      {blog.url}
      <br/>
      Likes: {likes}
      <br/>
      id: {blog.id}
      <br/>
      <>{blog.user && `Added by ${blog.user.username} (${blog.user.name})`}</>
      <button id='hide' className='details' onClick={toggle}>Hide</button>
      <button id='like' className='like' onClick={addLike}>like</button>
    </div>
  )
}

export default Blog