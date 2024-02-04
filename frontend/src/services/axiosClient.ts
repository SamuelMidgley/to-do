import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:5286/api',
})

export default axiosClient
