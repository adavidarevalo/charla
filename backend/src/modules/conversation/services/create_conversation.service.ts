import { injectable, inject } from 'tsyringe'
import createHttpError from 'http-errors'

import { type IConversationFindResult } from '../domain/model/IConversationFindResult'
import { IConversationRepository } from '../domain/repositories/IConversationRepository'
import { type ICreateConversationData } from '../domain/model/ICreateConversationRequest'

@injectable()
class CreateConversationService {
  constructor(
    @inject('ConversationRepository')
    private readonly ConversationRepository: IConversationRepository
  ) {}

  async execute(
    conversationData: ICreateConversationData
  ): Promise<IConversationFindResult | null> {
    const conversation =
      await this.ConversationRepository.create(conversationData)

    if (!conversation) {
      throw new createHttpError[400]('Cannot create conversation')
    }

    return conversation
  }
}

export default CreateConversationService
