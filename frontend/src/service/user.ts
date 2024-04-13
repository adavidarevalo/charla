import HttpService, { IHttpInstance } from '../utils/axios_instance'
import { ISearchUser } from '../types/search_user.type'

class UserServices {
  private axiosInstance: IHttpInstance
  constructor() {
    this.axiosInstance = new HttpService('user')
  }

  async searchUser(queryString: string, token: string): Promise<ISearchUser[]> {
    const result = await this.axiosInstance.http.get('', {
      params: { search: queryString },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  }
}

export default new UserServices()
