import { AxiosInstance } from 'axios'
import getAxiosInstances from '../utils/axios_instance'

class ConversationServices {
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = getAxiosInstances('conversation')
  }

  async getConversations(token: string) {
    const result = await this.axiosInstance.get('/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  }

  async createConversation(receiver_id: string, token: string) {
    const result = await this.axiosInstance.post(
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
