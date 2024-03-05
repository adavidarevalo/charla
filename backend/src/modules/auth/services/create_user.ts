import userRepository from '@modules/auth/infra/mongoose/repositories/user_repository'
import AppError from '@shared/errors/app_error'
import { injectable, inject } from 'tsyringe'
import { type IHashProvider } from '../provider/hashProvider/model/IHashProvider'
import { type IUser } from '../domain/models/IUser'

interface IRequest {
  _id?: string
  name: string
  email: string
  password: string
  status: string
  picture: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') private readonly UserRepository: userRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider
  ) {}

  public async execute(user: IRequest): Promise<IUser | null> {
    const findEmail = await this.UserRepository.findByEmail(user.email)

    if (findEmail) {
      throw new AppError('This email already exists', 400)
    }

    const hashedPassword = await this.hashProvider.generateHash(user.password)

    user.password = hashedPassword

    const userSaved = await this.UserRepository.create(user)

    return {
      _id: userSaved?._id,
      name: userSaved?.name,
      email: userSaved?.email,
      picture: userSaved?.picture,
      status: userSaved?.status,
      password: userSaved?.password
    }
  }
}

export default CreateUserService
