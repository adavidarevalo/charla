import { authMiddleware } from '@shared/http/middleware/auth.middleware'
import { Router } from 'express'
import SendMessageController from '../controller/send_message.controller'
import { Joi, Segments, celebrate } from 'celebrate'
import GetMessages from '../controller/get_messages.controller'

class MessageRoutes {
  private readonly router: Router

  constructor() {
    this.router = Router()
    this.setupRoutes()
  }

  private setupRoutes(): void {
    const sendMessageController = new SendMessageController()
    const getMessages = new GetMessages()

    this.router.post(
      '/',
      celebrate({
        [Segments.BODY]: {
          conversationId: Joi.string().required(),
          message: Joi.string().optional(),
          files: Joi.any().optional()
        }
      }),
      authMiddleware,
      sendMessageController.execute
    )

    this.router.get('/:conversationId', authMiddleware, getMessages.execute)
  }

  public getRouter(): Router {
    return this.router
  }
}

export default new MessageRoutes().getRouter()
