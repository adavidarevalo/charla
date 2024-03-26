import createHttpError from 'http-errors'
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
      throw new createHttpError[404]('Conversation not found')
    }

    return conversation
  }
}

export default PopulateConversationService
