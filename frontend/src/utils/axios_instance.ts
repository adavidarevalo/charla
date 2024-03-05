import axios, { AxiosInstance } from 'axios'
import { apiEndpoint } from './variables'

const getAxiosInstances = (path: string): AxiosInstance => {
  return axios.create({
    baseURL: `${apiEndpoint}/${path}`,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
  })
}

export default getAxiosInstances
