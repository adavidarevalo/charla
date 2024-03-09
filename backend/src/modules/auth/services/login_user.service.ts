import AppError from '@shared/errors/app_error'
import { inject, injectable } from 'tsyringe'
import userRepository from '@modules/auth/infra/mongoose/repositories/user.repository'
import { IHashProvider } from '../providers/hashProvider/model/IHashProvider'
import { type IUser } from '../domain/models/IUser'

interface IRequest {
  email: string
  password: string
}

@injectable()
class LoginUserService {
  constructor(
    @inject('UserRepository') private readonly UserRepository: userRepository,
    @inject('HashProvider') private readonly hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password
  }: IRequest): Promise<Omit<IUser, 'password'> | null> {
    const user = await this.UserRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid credentials', 400)
    }

    const passwordMatches = await this.hashProvider.compareHash(
      password,
      `${user?.password}`
    )

    if (!passwordMatches) {
      throw new AppError('Invalid credentials', 400)
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
