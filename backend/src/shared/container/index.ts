import { type IUserRepository } from '@modules/auth/domain/repositories/IUserRepository'
import UserRepository from '@modules/auth/infra/mongoose/repositories/user_repository'
import { container } from 'tsyringe'

import '@modules/auth/providers'
import { type IConversationRepository } from '@modules/conversation/domain/repositories/IConversationRepository'
import ConversationRepository from '@modules/conversation/infra/mongoose/repositories/conversation.repository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IConversationRepository>(
  'ConversationRepository',
  ConversationRepository
)
