import { type IMessageRepository } from '@modules/messages/domain/repositories/IMessageRepository'
import MessageModel from '../entities/message'
import { type ICreateMessage } from '@modules/messages/domain/model/ICreateMessage'
import { type IMessage } from '@modules/messages/domain/model/IMessage'

class MessageRepository implements IMessageRepository {
  async createMessage(message: ICreateMessage): Promise<IMessage | null> {
    const newMessage = await MessageModel.create(message)
    return newMessage
  }

  async populateMessage(messageId: string): Promise<IMessage | null> {
    const msg = await MessageModel.findById(messageId)
      .populate({
        path: 'sender',
        select: 'name picture',
        model: 'UserModel'
      })
      .populate({
        path: 'conversation',
        select: 'name picture isGroup users',
        model: 'ConversationModel',
        populate: {
          path: 'users',
          select: 'name email picture status',
          model: 'UserModel'
        }
      })
    return msg
  }

  async getMessagesByConversationId(
    conversationId: string
  ): Promise<IMessage[] | null> {
    const messages = await MessageModel.find({ conversation: conversationId })
      .populate('sender', 'name picture email status')
      .populate('conversation')

    return messages
  }
}

export default MessageRepository
