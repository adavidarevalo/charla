import { RegisterValues } from '../components/sign_up/form'
import HttpService, { IHttpInstance } from '../utils/axios_instance'

class AuthServices {
  private axiosInstance: IHttpInstance
  constructor() {
    this.axiosInstance = new HttpService('auth')
  }

  async registerUser(user: Omit<RegisterValues, 'repeat_password'>) {
    const result = await this.axiosInstance.http.post('/register', user)
    return result.data
  }

  async loginUser(values: { email: string; password: string }) {
    const result = await this.axiosInstance.http.post('/login', values)
    return result.data
  }

  async logoutUser() {
    await this.axiosInstance.http.post('/logout')
  }
}

export default new AuthServices()
