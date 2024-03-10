import { type IUser } from '@modules/auth/domain/models/IUser'

export interface IConversationFindResult {
  _id: string
  name: string
  isGroup: boolean
  users: Array<string | IUser>
  latestMessage: string
  createdAt?: Date
  updatedAt?: Date
}
