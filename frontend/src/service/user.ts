import { AxiosInstance } from 'axios'
import { RegisterValues } from '../components/sign_up/form'
import getAxiosInstances from '../utils/axios_instance'

class UserServices {
  private axiosInstance: AxiosInstance
  private axiosUserInstance: AxiosInstance
  constructor() {
    this.axiosInstance = getAxiosInstances('auth')
    this.axiosUserInstance = getAxiosInstances('user')
  }

  async registerUser(user: Omit<RegisterValues, 'repeat_password'>) {
    const result = await this.axiosInstance.post('/register', user)
    return result.data
  }

  async loginUser(values: { email: string; password: string }) {
    const result = await this.axiosInstance.post('/login', values)
    return result.data
  }

  async searchUser(query: string) {
    const result = await this.axiosUserInstance.get(`?search=${query}`)
    return result.data
  }
}

export default new UserServices()
