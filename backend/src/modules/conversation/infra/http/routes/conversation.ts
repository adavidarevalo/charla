import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { authMiddleware } from '@shared/http/middleware/auth.middleware'
import CreateOpenConversationController from '../controllers/create_open_conversation'
import GetConversationController from '../controllers/get_conversation'
import { container } from 'tsyringe'

class ConversationRoutes {
  private readonly router: Router

  constructor() {
    this.router = Router()
    this.setupRoutes()
  }

  private setupRoutes(): void {
    const getConversationController = new GetConversationController()
    const createOpenConversationController = container.resolve(
      CreateOpenConversationController
    )

    this.router.post(
      '/',
      celebrate({
        [Segments.BODY]: {
          receiverId: Joi.string().required(),
          groupId: Joi.string().optional()
        }
      }),
      authMiddleware,
      createOpenConversationController.execute.bind(
        createOpenConversationController
      )
    )
    this.router.get(
      '/',
      authMiddleware,
      getConversationController.execute.bind(getConversationController)
    )
  }

  public getRouter(): Router {
    return this.router
  }
}

export default new ConversationRoutes().getRouter()
