import UserModel from '@modules/auth/infra/mongoose/entities/user.entity'
import { type IUser } from '@modules/user/domain/models/IUser'
import { type IUserRepository } from '@modules/user/domain/repositories/IUserRepository'

class UserRepository implements IUserRepository {
  async searchUser(keyword: string, userId: string): Promise<IUser[] | null> {
    console.log('🚀 ~ UserRepository ~ searchUser ~ userId:', userId)
    const users = await UserModel.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } }
      ]
    }).find({
      _id: { $ne: userId }
    })
    return users as any
  }
}
export default UserRepository
