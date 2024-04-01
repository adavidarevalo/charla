import { File } from './../types/message.type'
import { IHttpInstance } from '../utils/axios_instance'
import HttpService from '../utils/axios_instance'

class MessageServices {
  private axiosInstance: IHttpInstance
  constructor() {
    this.axiosInstance = new HttpService('message')
  }

  async getConversation(conversation_id: string, token: string) {
    const result = await this.axiosInstance.http.get(`/${conversation_id}`, {
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
    const result = await this.axiosInstance.http.post(
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
