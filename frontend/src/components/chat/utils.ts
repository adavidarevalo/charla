import { User } from '../../types/user.type'

export const getConversationPicture = (user: User, users: User[]) => {
  return users[0]._id === user._id ? users[1].picture : users[0].picture
}
