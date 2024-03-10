import { inject, injectable } from 'tsyringe'
import { IMessageRepository } from '../domain/repositories/IMessageRepository'
import { type IMessage } from '../domain/model/IMessage'

@injectable()
class PopulatedMessageService {
  constructor(
    @inject('MessageRepository')
    private readonly MessageRepository: IMessageRepository
  ) {}

  public async execute(messageId: string): Promise<IMessage | null> {
    const msg = await this.MessageRepository.populateMessage(messageId)

    return msg
  }
}

export default PopulatedMessageService
