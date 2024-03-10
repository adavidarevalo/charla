import { type ICreateMessage } from '../../model/ICreateMessage'
import { type IMessage } from '../../model/IMessage'
import { type IMessageRepository } from '../IMessageRepository'

class FakeMessageRepository implements IMessageRepository {
  private readonly messages: IMessage[] = []
  public async createMessage(
    message?: ICreateMessage
  ): Promise<IMessage | null> {
    if (!message) return null

    const newMessage: IMessage = {
      _id: message._id,
      sender: message.sender,
      message: message.message,
      conversation: message.conversation,
      files: message.files
    }

    this.messages.push(newMessage)

    return newMessage
  }

  async populateMessage(messageId: string): Promise<IMessage | null> {
    const findMessage = this.messages.find(
      (message) => message._id === messageId
    )

    return findMessage ?? null
  }

  async getMessagesByConversationId(
    conversationId: string
  ): Promise<IMessage[] | null> {
    const messages = this.messages.filter(
      (message) => message.conversation === conversationId
    )

    return messages
  }
}

export default FakeMessageRepository
