import { type IConversation } from '@modules/conversation/domain/model/IConversation'
import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    isGroup: {
      type: Boolean,
      default: false,
      required: true
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
      }
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MessageModel'
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel'
    }
  },
  {
    collection: 'conversations',
    timestamps: true
  }
)

const conversation = mongoose.model('ConversationModel', conversationSchema)

export default conversation
