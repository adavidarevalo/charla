import { type IAuthUser } from '@modules/auth/domain/models/IAuthUser'
import UserModel from '../entities/user.entity'
import { type IAuthRepository } from '@modules/auth/domain/repositories/IAuthRepository'

class AuthRepository implements IAuthRepository {
  async findAll(): Promise<IAuthUser[]> {
    return await UserModel.find()
  }

  async findById(id: string): Promise<IAuthUser | null> {
    return await UserModel.findById(id)
  }

  async findByEmail(email: string): Promise<IAuthUser | null> {
    return await UserModel.findOne({ email })
  }

  async create(user: IAuthUser): Promise<IAuthUser> {
    const newUser = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
      status: user.status,
      picture: user.picture
    })

    const userSaved = await newUser.save()

    return userSaved.toObject() as IAuthUser
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id)
  }
}
export default AuthRepository
