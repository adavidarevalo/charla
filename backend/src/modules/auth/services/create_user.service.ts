import AppError from '@shared/errors/app_error'
import { injectable, inject } from 'tsyringe'
import { type IHashProvider } from '../providers/hashProvider/model/IHashProvider'
import { type IAuthUser } from '../domain/models/IAuthUser'
import authRepository from '@modules/auth/infra/mongoose/repositories/auth.repository'

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
    @inject('AuthRepository') private readonly AuthRepository: authRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider
  ) {}

  public async execute(user: IRequest): Promise<IAuthUser | null> {
    const findEmail = await this.AuthRepository.findByEmail(user.email)

    if (findEmail) {
      throw new AppError('This email already exists', 400)
    }

    const hashedPassword = await this.hashProvider.generateHash(user.password)

    user.password = hashedPassword

    const userSaved = await this.AuthRepository.create(user)

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
