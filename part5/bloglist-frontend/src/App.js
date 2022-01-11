import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'
import { BlogForm } from './components/BlogForm'
import { getAll, setToken } from './services/blogs'
import { login } from './services/login'
import { Togglable } from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [visible, setVisible] = useState(false)

  const badCredsMsg = () => {
    return (
      <div id={'error'}>Wrong username or password</div>
    )
  }

  const postAddedMsg = (title, author) => {
    setMessage(`New post ${title} by ${author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const postErrorMsg = () => {
    setMessage('Something went wrong, try again')
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  console.log(message)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userLogIn = await login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(userLogIn)
      )
      setUser(userLogIn)
      setToken(userLogIn.token)
      setUsername('')
      setPassword('')
      console.log(userLogIn)
    } catch (exception) {
      setMessage(badCredsMsg)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await getAll()
      blogs.sort((a, b) => a.likes - b.likes).reverse()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      setToken(loggedUser.token)
    }
  }, [])

  const toggle = () => {
    setVisible(!visible)
  }

  const onDelete = (blogId) => {
    setBlogs(blogs.filter(b => b.id !== blogId))
  }

  const onSubComplete = (blog) => {
    setBlogs(blogs.concat(blog))
    toggle()
  }

  if (user === null) return (
    <div>
      {message}
      <LoginForm
        onSubmit={handleLogin}
        user={user}
        onChangeUser={({ target }) => setUsername(target.value)}
        onChangePass={({ target }) => setPassword(target.value)}
      />
    </div>
  )

  return (
    <div  className='main'>
      <h1>Blogs list</h1>
      <div className='infoBar'>
        {`${user.name} is logged in `}
        <button className='undo' onClick={handleLogOut}>Log out</button>
      </div>
      <div>
        <Togglable
          toggle={toggle}
          isVisible={visible}
          textShow={'Post a new blog'}
          textHide={'Cancel'}
        >
          <BlogForm
            onSubmitComplete={onSubComplete}
            messageAdd={postAddedMsg}
            messageErr={postErrorMsg}
          />
        </Togglable>
      </div>
      <h4>Blogs</h4>
      <div id='blogslist'>
        {message}
        {blogs.map(blog => <ul key={blog.id}><Blog blogs={blogs} blog={blog} user={user} onDelete={onDelete}/></ul>)}
      </div>
    </div>
  )
}

export default App