import { inject, injectable } from 'tsyringe'
import { type IAuthUser } from '../domain/models/IAuthUser'
import authRepository from '@modules/auth/infra/mongoose/repositories/auth.repository'

@injectable()
class FindByIdUserService {
  constructor(
    @inject('AuthRepository') private readonly AuthRepository: authRepository
  ) {}

  public async execute(id: string): Promise<IAuthUser | null> {
    const findEmail = await this.AuthRepository.findById(id)

    return findEmail
  }
}

export default FindByIdUserService
