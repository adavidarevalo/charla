import { type IMessage } from '@modules/messages/domain/model/IMessage'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const messageSchema = new mongoose.Schema<IMessage>(
  {
    sender: {
      type: ObjectId,
      ref: 'UserModel'
    },
    message: {
      type: String,
      trim: true
    },
    conversation: {
      type: ObjectId,
      ref: 'ConversationModel'
    },
    files: []
  },
  {
    collection: 'messages',
    timestamps: true
  }
)

const MessageModel = mongoose.model('MessageModel', messageSchema)

export default MessageModel
