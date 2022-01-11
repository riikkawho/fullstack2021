import axios from 'axios'
const baseUrl = '/api/blogs'

export let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const sendLike = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}

export const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}
