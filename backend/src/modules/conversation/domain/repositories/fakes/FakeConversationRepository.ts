import { type IConversationRepository } from '../IConversationRepository'
import { type IConversation } from '../../model/IConversation'
import { type ICreateConversationData } from '../../model/ICreateConversationRequest'
import { type IConversationFindResult } from '../../model/IConversationFindResult'

class FakeConversationRepository implements IConversationRepository {
  private readonly conversations: IConversation[] = []

  async create(
    conversationData: ICreateConversationData
  ): Promise<IConversationFindResult> {
    const newConversation = {
      _id: conversationData._id ?? '123',
      name: conversationData.name,
      isGroup: conversationData.isGroup,
      users: conversationData.users as string[],
      latestMessage: '',
      admin: ''
    }
    this.conversations.push(newConversation)

    return newConversation
  }

  async findConversation(
    senderId: string,
    receiverId: string
  ): Promise<IConversationFindResult[] | null> {
    const conversationResult = this.conversations.find(
      (conversation) =>
        conversation.users.includes(senderId) &&
        conversation.users.includes(receiverId)
    )

    if (!conversationResult) return null

    return [
      {
        _id: `${conversationResult?._id}`,
        name: conversationResult.name,
        isGroup: conversationResult.isGroup,
        users: conversationResult.users
      }
    ]
  }

  async getConversationByUserId(
    userId: string
  ): Promise<IConversationFindResult[] | null> {
    const conversationResult = this.conversations.find((conversation) =>
      conversation.users.includes(userId)
    )

    if (!conversationResult) return null

    return [
      {
        _id: `${conversationResult?._id}`,
        name: conversationResult.name,
        isGroup: conversationResult.isGroup,
        users: conversationResult.users
      }
    ]
  }

  async findByIdAndPopulate(
    id: string,
    fieldToPopulate: string,
    fieldsToRemove: string
  ): Promise<IConversationFindResult | null> {
    const conversationResult = this.conversations.find(
      (conversation) => conversation._id === id
    )

    if (!conversationResult) return null

    return {
      _id: `${conversationResult?._id}`,
      name: conversationResult.name,
      isGroup: conversationResult.isGroup,
      users: conversationResult.users
    }
  }

  async findConversationById(
    isGroup: string
  ): Promise<IConversationFindResult | null> {
    const conversationResult = this.conversations.find(
      (conversation) => conversation._id === isGroup
    )

    if (!conversationResult) return null

    return {
      _id: `${conversationResult?._id}`,
      name: conversationResult.name,
      isGroup: conversationResult.isGroup,
      users: conversationResult.users
    }
  }

  async populateTheUserModel(
    conversation: IConversationFindResult[] | IConversationFindResult
  ): Promise<any> {
    const conversationResult = this.conversations[0]
    return {
      _id: `${conversationResult?._id}`,
      name: conversationResult.name,
      isGroup: conversationResult.isGroup,
      users: conversationResult.users
    }
  }
}

export default FakeConversationRepository
