import { type IUser } from '@modules/user/domain/models/IUser'

export interface IConversation {
  _id?: string
  name: string
  isGroup: boolean
  users: Array<string | IUser>
  latestMessage: string | any
  admin: string | IUser
  picture?: string
}
