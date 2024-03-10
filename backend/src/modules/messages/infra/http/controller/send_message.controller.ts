import UpdateLatestMessageService from '@modules/conversation/services/update_latest_message.service'
import { type IMessage } from '@modules/messages/domain/model/IMessage'
import CreateMessageService from '@modules/messages/services/create_message.service'
import PopulatedMessageService from '@modules/messages/services/populated_message.service'
import AppError from '@shared/errors/app_error'
import { type Request, type Response } from 'express'
import get from 'lodash/get'
import { container } from 'tsyringe'

class SendMessageController {
  async execute(
    request: Request,
    response: Response
  ): Promise<Response<IMessage>> {
    const { conversationId, message, files } = request.body as {
      conversationId: string
      message: string
      files: any[]
    }
    const senderId: string = get(request, 'user.userId', '')

    const createMessageService = container.resolve(CreateMessageService)

    const messageCreated = await createMessageService.execute({
      sender: senderId,
      message,
      conversation: conversationId,
      files
    })

    if (!messageCreated) {
      throw new AppError('Message not created!', 404)
    }

    const populatedMessageService = container.resolve(PopulatedMessageService)

    const messagePopulated = await populatedMessageService.execute(
      messageCreated._id ?? ''
    )

    const updateLatestMessageService = container.resolve(
      UpdateLatestMessageService
    )

    await updateLatestMessageService.execute(
      conversationId,
      messageCreated._id ?? ''
    )

    return response.status(200).json(messagePopulated)
  }
}

export default SendMessageController
