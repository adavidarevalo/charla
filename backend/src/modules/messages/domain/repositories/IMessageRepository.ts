import { type ICreateMessage } from '../model/ICreateMessage'
import { type IMessage } from '../model/IMessage'

export interface IMessageRepository {
  createMessage: (message: ICreateMessage) => Promise<IMessage | null>
  populateMessage: (messageId: string) => Promise<IMessage | null>
  getMessagesByConversationId: (
    conversationId: string
  ) => Promise<IMessage[] | null>
}
