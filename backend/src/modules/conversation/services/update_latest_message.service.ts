import { inject, injectable } from 'tsyringe'
import { IConversationRepository } from '../domain/repositories/IConversationRepository'
import { type IConversationFindResult } from '../domain/model/IConversationFindResult'

@injectable()
class UpdateLatestMessageService {
  constructor(
    @inject('ConversationRepository')
    private readonly ConversationRepository: IConversationRepository
  ) {}

  public async execute(
    conversationId: string,
    message: string
  ): Promise<IConversationFindResult | null> {
    const updatedConversation =
      await this.ConversationRepository.updateLastMessage(
        conversationId,
        message
      )

    return updatedConversation
  }
}

export default UpdateLatestMessageService
