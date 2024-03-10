import { type IMessage } from '@modules/messages/domain/model/IMessage'
import GetMessageService from '@modules/messages/services/get_messages.service'
import { type Request, type Response } from 'express'
import get from 'lodash/get'
import { container } from 'tsyringe'

class GetMessages {
  async execute(
    request: Request,
    response: Response
  ): Promise<Response<IMessage[]>> {
    const conversationId = get(request, 'params.conversationId', '')

    const getMessageService = container.resolve(GetMessageService)

    const messagesResult = await getMessageService.execute(conversationId)

    return response.status(200).json(messagesResult)
  }
}

export default GetMessages
