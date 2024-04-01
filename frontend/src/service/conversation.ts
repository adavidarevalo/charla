import HttpService, { IHttpInstance } from '../utils/axios_instance'

class ConversationServices {
  private axiosInstance: IHttpInstance
  constructor() {
    this.axiosInstance = new HttpService('conversation')
  }

  async getConversations(token: string) {
    const result = await this.axiosInstance.http.get('/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  }

  async createConversation(receiver_id: string, token: string) {
    const result = await this.axiosInstance.http.post(
      '/',
      { receiverId: receiver_id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return result.data
  }
}

export default new ConversationServices()
