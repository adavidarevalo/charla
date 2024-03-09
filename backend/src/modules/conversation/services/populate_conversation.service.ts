import AppError from '@shared/errors/app_error'
import { injectable, inject } from 'tsyringe'
import { type IConversationFindResult } from '../domain/model/IConversationFindResult'
import { IConversationRepository } from '../domain/repositories/IConversationRepository'

@injectable()
class PopulateConversationService {
  constructor(
    @inject('ConversationRepository')
    private readonly ConversationRepository: IConversationRepository
  ) {}

  public async execute(
    id: string,
    fieldToPopulate: string,
    fieldsToRemove: string
  ): Promise<IConversationFindResult> {
    const conversation = await this.ConversationRepository.findByIdAndPopulate(
      id,
      fieldToPopulate,
      fieldsToRemove
    )

    if (!conversation) {
      throw new AppError('Conversation not found', 404)
    }

    return conversation
  }
}

export default PopulateConversationService
