import { AxiosInstance } from 'axios'
import getAxiosInstances from '../utils/axios_instance'
import { File } from './../types/message.type'

class MessageServices {
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = getAxiosInstances('message')
  }

  async getConversation(conversation_id: string, token: string) {
    const result = await this.axiosInstance.get(`/${conversation_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  }

  async sendMessage(
    message: string,
    conversationId: string,
    token: string,
    files: File[]
  ) {
    const result = await this.axiosInstance.post(
      `/`,
      {
        message,
        conversationId,
        files
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return result.data
  }
}

export default new MessageServices()
