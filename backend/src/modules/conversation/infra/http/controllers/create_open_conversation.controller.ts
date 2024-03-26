import { type NextFunction, type Request, type Response } from 'express'
import DoesConversationExist from '@modules/conversation/services/does_conversation_exist.service'
import CreateConversation from '@modules/conversation/services/create_conversation.service'
import PopulateConversation from '@modules/conversation/services/populate_conversation.service'
import get from 'lodash/get'
import { container } from 'tsyringe'
import { type ICreateConversationData } from '@modules/conversation/domain/model/ICreateConversationRequest'
import FindByIdUserService from '@services/find_user.service'
import { type IConversationFindResult } from '@modules/conversation/domain/model/IConversationFindResult'
import createHttpError from 'http-errors'

export interface UserRequest extends Request {
  user?: {
    userId: string
  }
}

interface CreateOpenConversationControllerRequestBody {
  receiverId: string
  groupId: string
}

class CreateOpenConversationController {
  public async execute(
    request: UserRequest,
    response: Response,
    next: NextFunction
  ): Promise<Response<IConversationFindResult> | void> {
    try {
      const senderId: string = get(request, 'user.userId', '')

      const { receiverId, groupId } =
        request.body as CreateOpenConversationControllerRequestBody

      const doesConversationExist = container.resolve(DoesConversationExist)
      const createConversation = container.resolve(CreateConversation)
      const populateConversation = container.resolve(PopulateConversation)

      const existedConversation = await doesConversationExist.execute(
        senderId,
        receiverId,
        groupId || ''
      )

      if (groupId) {
        if (existedConversation) {
          return response.json(existedConversation)
        }
        const conversationData: ICreateConversationData = {
          name: 'conversation name',
          picture: 'conversation picture',
          isGroup: false,
          users: [senderId, receiverId]
        }

        const newConversation =
          await createConversation.execute(conversationData)

        if (!newConversation) {
          throw new createHttpError[400]('Cannot create conversation')
        }

        const populatedConversation = await populateConversation.execute(
          newConversation._id,
          'users',
          '-password'
        )
        return response.status(200).json(populatedConversation)
      }

      if (existedConversation) {
        return response.status(200).json(existedConversation)
      }

      const findByIdUserService = container.resolve(FindByIdUserService)

      const receiverUser = await findByIdUserService.execute(receiverId)

      if (!receiverUser) {
        throw new createHttpError[400]('Receiver user not found')
      }

      const conversationData: ICreateConversationData = {
        name: receiverUser.name,
        picture: receiverUser.picture,
        isGroup: false,
        users: [senderId, receiverId]
      }

      const newConversation = await createConversation.execute(conversationData)

      if (!newConversation) {
        throw new createHttpError[400]('Cannot create conversation')
      }

      const populateConversationResult = await populateConversation.execute(
        newConversation._id,
        'users',
        '-password'
      )

      return response.status(200).json(populateConversationResult)
    } catch (error) {
      next(error)
    }
  }
}

export default CreateOpenConversationController
