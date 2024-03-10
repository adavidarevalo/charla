import { inject, injectable } from 'tsyringe'
import { IMessageRepository } from '../domain/repositories/IMessageRepository'
import { type IMessage } from '../domain/model/IMessage'

@injectable()
class GetMessageService {
  constructor(
    @inject('MessageRepository')
    private readonly MessageRepository: IMessageRepository
  ) {}

  public async execute(conversationId: string): Promise<IMessage[] | null> {
    const messages =
      await this.MessageRepository.getMessagesByConversationId(conversationId)

    return messages
  }
}

export default GetMessageService
