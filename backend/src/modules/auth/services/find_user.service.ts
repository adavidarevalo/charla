import { inject, injectable } from 'tsyringe'
import { type IUser } from '../domain/models/IUser'
import userRepository from '@modules/auth/infra/mongoose/repositories/user.repository'

@injectable()
class FindByIdUserService {
  constructor(
    @inject('UserRepository') private readonly UserRepository: userRepository
  ) {}

  public async execute(id: string): Promise<IUser | null> {
    const findEmail = await this.UserRepository.findById(id)

    return findEmail
  }
}

export default FindByIdUserService
