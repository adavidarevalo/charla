import { inject, injectable } from 'tsyringe'
import createHttpError from 'http-errors'
import { IMessageRepository } from '../domain/repositories/IMessageRepository'
import { type ICreateMessage } from '../domain/model/ICreateMessage'
import { type IMessage } from '../domain/model/IMessage'

@injectable()
class CreateMessageService {
  constructor(
    @inject('MessageRepository')
    private readonly MessageRepository: IMessageRepository
  ) {}

  public async execute(message: ICreateMessage): Promise<IMessage | null> {
    const newMessage = await this.MessageRepository.createMessage(message)

    if (!newMessage) {
      throw new createHttpError.NotFound('Message not created!')
    }

    return newMessage
  }
}

export default CreateMessageService
