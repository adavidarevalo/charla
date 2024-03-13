import { inject, injectable } from 'tsyringe'
import { type IUser } from '../domain/models/IUser'
import userRepository from '../infra/mongoose/repositories/user.repository'

@injectable()
class SearchUserService {
  constructor(
    @inject('UserRepository') private readonly UserRepository: userRepository
  ) {}

  public async execute(
    keyword: string,
    userId: string
  ): Promise<IUser[] | null> {
    const users = await this.UserRepository.searchUser(keyword, userId)

    return users
  }
}

export default SearchUserService
