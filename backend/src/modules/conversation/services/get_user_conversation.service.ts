import { injectable, inject } from 'tsyringe'
import createHttpError from 'http-errors'

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
      throw new createHttpError[400]('Cannot create conversation')
    }

    return conversations
  }
}

export default GetUserConversationService
