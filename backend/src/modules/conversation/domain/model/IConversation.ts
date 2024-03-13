import { type IUser } from '@modules/auth/domain/models/IAuthUser'

export interface IConversation {
  _id?: string
  name: string
  isGroup: boolean
  users: Array<string | IUser>
  latestMessage: string | any
  admin: string | IUser
}
