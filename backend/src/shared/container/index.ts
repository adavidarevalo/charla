import { type IUserRepository } from '@modules/auth/domain/repositories/IUserRepository'
import UserRepository from '@modules/auth/infra/mongoose/repositories/user_repository'
import { container } from 'tsyringe'

import '@modules/auth/providers'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
