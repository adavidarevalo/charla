import { type IUser } from '@modules/auth/domain/models/IAuthUser'
import { type IConversation } from '@modules/conversation/domain/model/IConversation'

export interface IMessage {
  _id?: string
  sender: string | IUser
  message: string
  conversation: string | IConversation
  files: any
}
