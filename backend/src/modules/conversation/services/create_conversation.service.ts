import AppError from '@shared/errors/app_error'
import { injectable, inject } from 'tsyringe'
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
      throw new AppError('Cannot create conversation', 400)
    }

    return conversation
  }
}

export default CreateConversationService
