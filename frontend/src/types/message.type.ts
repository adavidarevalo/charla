import { Conversation } from './conversation.type'
import { User } from './user.type'

export interface File {
  fileUrl: string
  fileName: string
  fileSize: number
  fileType: string
}

interface Message {
  _id: string
  sender: User
  message: string
  conversation: Conversation
  files: File[]
  createdAt: string
  updatedAt: string
  __v: number
}

export default Message
