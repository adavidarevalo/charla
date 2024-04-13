import { type NextFunction, type Request, type Response } from 'express'
import createHttpError from 'http-errors'
import { container } from 'tsyringe'
import CreateConversation from '@modules/conversation/services/create_conversation.service'
import { type ICreateConversationData } from '@modules/conversation/domain/model/ICreateConversationRequest'
import PopulateConversation from '@modules/conversation/services/populate_conversation.service'

export interface UserRequest extends Request {
  user?: {
    userId: string
  }
}

class CreateGroupController {
  public async execute(
    request: UserRequest,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { name, users } = request.body
      users.push(request.user!.userId)
      if (!name || !users) {
        throw createHttpError.BadRequest('Please fill all fields.')
      }

      if (users.length < 2) {
        throw createHttpError.BadRequest(
          'Atleast 2 users are required to start a group chat.'
        )
      }

      const conversationData: ICreateConversationData = {
        name,
        users,
        isGroup: true,
        admin: request.user!.userId,
        picture: `${process.env.DEFAULT_GROUP_PICTURE}`
      }

      const createConversation = container.resolve(CreateConversation)
      const populateConversation = container.resolve(PopulateConversation)

      const newConversationGroup =
        await createConversation.execute(conversationData)

      if (!newConversationGroup) {
        throw new createHttpError[400]('Cannot create conversation')
      }

      const populatedConversation = await populateConversation.execute(
        newConversationGroup._id,
        'users admin',
        '-password'
      )

      response.status(200).json(populatedConversation)
    } catch (error) {
      next(error)
    }
  }
}

export default CreateGroupController
