import { type IAuthRepository } from '@modules/auth/domain/repositories/IAuthRepository'
import AuthRepository from '@modules/auth/infra/mongoose/repositories/auth.repository'
import { container } from 'tsyringe'

import '@modules/auth/providers'
import { type IConversationRepository } from '@modules/conversation/domain/repositories/IConversationRepository'
import ConversationRepository from '@modules/conversation/infra/mongoose/repositories/conversation.repository'
import { type IMessageRepository } from '@modules/messages/domain/repositories/IMessageRepository'
import MessageRepository from '@modules/messages/infra/mongoose/repositories/message.repository'
import { type IUserRepository } from '@modules/user/domain/repositories/IUserRepository'
import UserRepository from '@modules/user/infra/mongoose/repositories/user.repository'

container.registerSingleton<IAuthRepository>('AuthRepository', AuthRepository)
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IConversationRepository>(
  'ConversationRepository',
  ConversationRepository
)
container.registerSingleton<IMessageRepository>(
  'MessageRepository',
  MessageRepository
)
