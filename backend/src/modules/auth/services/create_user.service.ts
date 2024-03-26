import { injectable, inject } from 'tsyringe'
import { type IHashProvider } from '../providers/hashProvider/model/IHashProvider'
import { type IAuthUser } from '../domain/models/IAuthUser'
import authRepository from '@modules/auth/infra/mongoose/repositories/auth.repository'
import createHttpError from 'http-errors'

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

  public async execute(user: IRequest): Promise<IAuthUser | any | null> {
    const findEmail = await this.AuthRepository.findByEmail(user.email)

    if (findEmail) {
      throw new createHttpError[400]('This email already exists')
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
