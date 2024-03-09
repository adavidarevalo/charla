import { type Response } from 'express'
import get from 'lodash/get'

import GetUserConversation from '@modules/conversation/services/get_user_conversation'
import { type UserRequest } from './create_open_conversation'
import { container } from 'tsyringe'

class GetConversationController {
  public async execute(
    request: UserRequest,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const senderId: string = get(request, 'user.userId', '')

    const getUserConversation = container.resolve(GetUserConversation)

    const conversations = await getUserConversation.execute(senderId)

    return response.status(200).json(conversations)
  }
}

export default GetConversationController