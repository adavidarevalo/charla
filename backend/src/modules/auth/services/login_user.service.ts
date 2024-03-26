import createHttpError from 'http-errors'
import { inject, injectable } from 'tsyringe'
import authRepository from '@modules/auth/infra/mongoose/repositories/auth.repository'
import { IHashProvider } from '../providers/hashProvider/model/IHashProvider'
import { type IAuthUser } from '../domain/models/IAuthUser'

interface IRequest {
  email: string
  password: string
}

@injectable()
class LoginUserService {
  constructor(
    @inject('AuthRepository') private readonly AuthRepository: authRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password
  }: IRequest): Promise<Omit<IAuthUser, 'password'> | null> {
    const user = await this.AuthRepository.findByEmail(email)

    if (!user) {
      throw createHttpError[400]('Invalid credentials')
    }

    const passwordMatches = await this.hashProvider.compareHash(
      password,
      `${user?.password}`
    )

    if (!passwordMatches) {
      throw createHttpError[400]('Invalid credentials')
    }

    return {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      picture: user?.picture,
      status: user?.status
    }
  }
}

export default LoginUserService
