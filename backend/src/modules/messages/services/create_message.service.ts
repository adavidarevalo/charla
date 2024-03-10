import { inject, injectable } from 'tsyringe'
import { IMessageRepository } from '../domain/repositories/IMessageRepository'
import { type ICreateMessage } from '../domain/model/ICreateMessage'
import AppError from '@shared/errors/app_error'
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
      throw new AppError('Message not created!', 404)
    }

    return newMessage
  }
}

export default CreateMessageService
