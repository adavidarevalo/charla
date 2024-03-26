import UpdateLatestMessageService from '@modules/conversation/services/update_latest_message.service'
import { type IMessage } from '@modules/messages/domain/model/IMessage'
import CreateMessageService from '@modules/messages/services/create_message.service'
import PopulatedMessageService from '@modules/messages/services/populated_message.service'
import { type NextFunction, type Request, type Response } from 'express'
import get from 'lodash/get'
import { container } from 'tsyringe'
import createHttpError from 'http-errors'

class SendMessageController {
  async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<IMessage> | void> {
    try {
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
        throw new createHttpError.InternalServerError('Message not created!')
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
    } catch (error) {
      next(error)
    }
  }
}

export default SendMessageController
