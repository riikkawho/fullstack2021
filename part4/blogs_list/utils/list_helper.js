const dummy = (blogs) => {
  return blogs.length + 1
}

const totalLikes = (blogs) => {
  const total = (sum, like) => { 
    return sum + like  
  }
  const likes = blogs.map(blog => blog.likes)
  return likes.reduce(total, 0)
}

const favouriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const mostLikes = Math.max(...likes)
  const body = blogs.find(blog => blog.likes === mostLikes)

  return ({
    title: body.title,
    author:  body.author,
    likes: body.likes
  })
}

const mostBlogs = (blogs) => {

  const countsByAuthor = {}

  blogs.forEach(blog => {
    const count = countsByAuthor[blog.author] || 0
    countsByAuthor[blog.author] = count + 1
  })

  const array = Object.keys(countsByAuthor)
  const maxValue = () => Math.max(...Object.values(countsByAuthor))
  const index = array.findIndex(maxValue)
  const maxAuthor = array[index]

  return {author: maxAuthor, blogs: maxValue()} 

}

const mostLikes = (blogs) => {

  const likesPerAuthor = {}

  blogs.forEach(blog => {
    const count = likesPerAuthor[blog.author] || 0
    likesPerAuthor[blog.author] = count + blog.likes
  })
    
  const array = Object.keys(likesPerAuthor)
  const maxValue = () => Math.max(...Object.values(likesPerAuthor))
  const index = array.findIndex(maxValue)
  const maxAuthor = array[index]

  console.log({author: maxAuthor, likes: maxValue()})
  return {author: maxAuthor, likes: maxValue()} 
}


module.exports = { 
  dummy, 
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}