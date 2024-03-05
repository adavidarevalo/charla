import { type IUser } from '@modules/auth/domain/models/IUser'
import UserModel from '../entities/user'
import { type IUserRepository } from '@modules/auth/domain/repositories/IUserRepository'

class UserRepository implements IUserRepository {
  async findAll(): Promise<IUser[]> {
    return await UserModel.find()
  }

  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id)
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email })
  }

  async create(user: IUser): Promise<IUser> {
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
      status: user.status,
      picture: user.picture
    })

    const userSaved = await newUser.save()

    return userSaved.toObject() as IUser
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id)
  }
}
export default UserRepository
