import { type IConversationRepository } from '@modules/conversation/domain/repositories/IConversationRepository'
import ConversationModel from '../entities/conversation.entitie'
import UserModel from '@modules/auth/infra/mongoose/entities/user.entity'
import { type IConversationFindResult } from '@modules/conversation/domain/model/IConversationFindResult'
import { type ICreateConversationData } from '@modules/conversation/domain/model/ICreateConversationRequest'

class ConversationRepository implements IConversationRepository {
  async findConversation(
    senderId: string,
    receiverId: string
  ): Promise<IConversationFindResult[] | null> {
    const conversation = await ConversationModel.find({
      isGroup: false,
      users: { $all: [receiverId, senderId] }
    })
      .populate('users', '-password')
      .populate('latestMessage')

    return conversation
  }

  async populateTheUserModel(
    conversation: IConversationFindResult[] | IConversationFindResult
  ): Promise<any> {
    const conversationResult = await UserModel.populate(conversation, {
      path: 'latestMessage.sender',
      select: 'name email picture status'
    })

    return conversationResult
  }

  async findConversationById(
    isGroup: string
  ): Promise<IConversationFindResult | null> {
    const conversation = await ConversationModel.findById(isGroup)
      .populate('users admin', '-password')
      .populate('latestMessage')

    return conversation
  }

  async create(
    conversationData: ICreateConversationData
  ): Promise<IConversationFindResult> {
    const conversation = await (
      await ConversationModel.create(conversationData)
    ).save()
    console.log('🚀 ~ ConversationRepository ~ conversation:', conversation)

    return conversation
  }

  async findByIdAndPopulate(
    id: string,
    fieldToPopulate: string,
    fieldsToRemove: string
  ): Promise<IConversationFindResult | null> {
    const conversation = await ConversationModel.findById(id).populate(
      fieldToPopulate,
      fieldsToRemove
    )
    return conversation
  }

  async getConversationByUserId(
    userId: string
  ): Promise<IConversationFindResult[]> {
    let conversations: IConversationFindResult[] = []
    await ConversationModel.find({
      users: { $elemMatch: { $eq: userId } }
    })
      .populate('users', '-password')
      .populate('admin', '-password')
      .populate('latestMessage')
      .sort({ createdAt: -1 })
      .then(async (results) => {
        const r = await UserModel.populate(results, {
          path: 'latestMessage.sender',
          select: 'name email picture status'
        })
        conversations = r as any
      })

    return conversations
  }

  async updateLastMessage(
    conversationId: string,
    messageId: string
  ): Promise<IConversationFindResult | null> {
    const updatedConversation = await ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        latestMessage: messageId
      }
    )

    return updatedConversation
  }
}

export default ConversationRepository
