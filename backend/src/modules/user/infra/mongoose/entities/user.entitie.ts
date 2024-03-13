import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    picture: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: "Hey I'm using the app"
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      maxlength: 120
    }
  },
  {
    collection: 'users',
    timestamps: true
  }
)

const UserModel = mongoose.model('UserModel', userSchema)

export default UserModel
