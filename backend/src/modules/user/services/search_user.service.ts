// import { inject, injectable } from 'tsyringe'
import { type IUser } from '../domain/models/IUser'
import UserRepository from '../infra/mongoose/repositories/user.repository'
// import userRepository from '@modules/auth/infra/mongoose/repositories/user.repository'

// @injectable()
class SearchUserService {
  //   constructor(
  //     @inject('UserRepository') private readonly UserRepository: userRepository
  //   ) {}

  public async execute(
    keyword: string,
    userId: string
  ): Promise<IUser[] | null> {
    const userRepository = new UserRepository()
    const users = await userRepository.searchUser(keyword, userId)

    return users
  }
}

export default SearchUserService
