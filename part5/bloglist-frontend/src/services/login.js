import axios from 'axios'
const baseUrl = '/api/login'

export const login = async ({ username, password }) => {
  const response = await axios.post(baseUrl, { username, password })
  console.log(response)
  return response.data
}
