import axios, { AxiosInstance } from 'axios'
import { apiEndpoint } from './variables'

const getAxiosInstances = (path: string): AxiosInstance => {
  return axios.create({
    baseURL: `${apiEndpoint}/${path}`
  })
}

export default getAxiosInstances
