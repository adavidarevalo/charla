import { type Request, type Response } from 'express'
import DoesConversationExist from '@modules/conversation/services/does_conversation_exist'
import CreateConversation from '@modules/conversation/services/create_conversation'
import PopulateConversation from '@modules/conversation/services/populate_conversation'
import AppError from '@shared/errors/app_error'
import get from 'lodash/get'
import { container, inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../../../auth/domain/repositories/IUserRepository'
import { type ICreateConversationData } from '@modules/conversation/domain/model/ICreateConversationRequest'

export interface UserRequest extends Request {
  user?: {
    userId: string
  }
}

interface CreateOpenConversationControllerRequestBody {
  receiverId: string
  groupId: string
}

@injectable()
class CreateOpenConversationController {
  constructor(
    @inject('UserRepository') private readonly UserRepository: IUserRepository
  ) {}

  public async execute(
    request: UserRequest,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
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

      const newConversation = await createConversation.execute(conversationData)

      if (!newConversation) {
        throw new AppError('Cannot create conversation', 400)
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

    const receiverUser = await this.UserRepository.findById(receiverId)

    if (!receiverUser) {
      throw new AppError('Receiver user not found', 400)
    }

    const conversationData: ICreateConversationData = {
      name: receiverUser.name,
      picture: receiverUser.picture,
      isGroup: false,
      users: [senderId, receiverId]
    }

    const newConversation = await createConversation.execute(conversationData)

    if (!newConversation) {
      throw new AppError('Cannot create conversation', 400)
    }

    const populateConversationResult = await populateConversation.execute(
      newConversation._id,
      'users',
      '-password'
    )

    return response.status(200).json(populateConversationResult)
  }
}

export default CreateOpenConversationController
