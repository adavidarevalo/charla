import { type IConversationFindResult } from '../model/IConversationFindResult'
import { type ICreateConversationData } from '../model/ICreateConversationRequest'

export interface IConversationRepository {
  findConversation: (
    senderId: string,
    receiverId: string
  ) => Promise<IConversationFindResult[] | null>
  populateTheUserModel: (
    conversation: IConversationFindResult[] | IConversationFindResult
  ) => Promise<any>
  findConversationById: (
    isGroup: string
  ) => Promise<IConversationFindResult | null>
  create: (
    conversationData: ICreateConversationData
  ) => Promise<IConversationFindResult>
  findByIdAndPopulate: (
    id: string,
    fieldToPopulate: string,
    fieldsToRemove: string
  ) => Promise<IConversationFindResult | null>
  getConversationByUserId: (
    userId: string
  ) => Promise<IConversationFindResult[] | null>
  updateLastMessage: (
    conversationId: string,
    message: string
  ) => Promise<IConversationFindResult | null>
}
