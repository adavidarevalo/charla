import createHttpError from 'http-errors'
import { injectable, inject } from 'tsyringe'
import { type IConversationFindResult } from '../domain/model/IConversationFindResult'
import { IConversationRepository } from '../domain/repositories/IConversationRepository'

@injectable()
class DoesConversationExistService {
  constructor(
    @inject('ConversationRepository')
    private readonly ConversationRepository: IConversationRepository
  ) {}

  public async execute(
    senderId: string,
    receiverId: string,
    groupId: string
  ): Promise<IConversationFindResult | null> {
    if (!groupId) {
      let conversation = await this.ConversationRepository.findConversation(
        senderId,
        receiverId
      )

      if (!conversation) return null

      conversation =
        await this.ConversationRepository.populateTheUserModel(conversation)

      return !conversation ? null : conversation[0]
    } else {
      let conversation =
        await this.ConversationRepository.findConversationById(groupId)

      if (!conversation) {
        throw new createHttpError[400]('Cannot find conversation')
      }

      conversation =
        await this.ConversationRepository.populateTheUserModel(conversation)

      return conversation
    }
  }
}

export default DoesConversationExistService
