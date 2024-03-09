import AppError from '@shared/errors/app_error'
import { injectable, inject } from 'tsyringe'

import { IConversationRepository } from '../domain/repositories/IConversationRepository'
import { type IConversationFindResult } from '../domain/model/IConversationFindResult'

@injectable()
class GetUserConversationService {
  constructor(
    @inject('ConversationRepository')
    private readonly ConversationRepository: IConversationRepository
  ) {}

  public async execute(
    userId: string
  ): Promise<IConversationFindResult[] | null> {
    const conversations =
      await this.ConversationRepository.getConversationByUserId(userId)

    if (!conversations) {
      throw new AppError('Cannot create conversation', 400)
    }

    return conversations
  }
}

export default GetUserConversationService
