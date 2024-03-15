import { AxiosInstance } from 'axios'
import getAxiosInstances from '../utils/axios_instance'

class UserServices {
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = getAxiosInstances('user')
  }

  async searchUser(queryString: string, token: string) {
    const result = await this.axiosInstance.get('', {
      params: { search: queryString },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  }
}

export default new UserServices()
