import { type Response } from 'express'
import get from 'lodash/get'

import GetUserConversation from '@modules/conversation/services/get_user_conversation.service'
import { type UserRequest } from './create_open_conversation.controller'
import { container } from 'tsyringe'
import { type IConversationFindResult } from '@modules/conversation/domain/model/IConversationFindResult'

class GetConversationController {
  public async execute(
    request: UserRequest,
    response: Response
  ): Promise<Response<IConversationFindResult[] | null>> {
    const senderId: string = get(request, 'user.userId', '')

    const getUserConversation = container.resolve(GetUserConversation)

    const conversations = await getUserConversation.execute(senderId)

    return response.status(200).json(conversations)
  }
}

export default GetConversationController
