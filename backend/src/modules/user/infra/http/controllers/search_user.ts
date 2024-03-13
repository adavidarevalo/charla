import SearchUserService from '@modules/user/services/search_user.service'
// import CreateUserService from '@services/create_user.service'
import AppError from '@shared/errors/app_error'
import { type Request, type Response } from 'express'
import get from 'lodash/get'
import logger from 'src/config/logger.config'
// import { container } from 'tsyringe'

interface IRequest extends Request {
  user?: {
    userId: string
  }
}

class SearchUserController {
  public async execute(
    request: IRequest,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const keyword = request.query.search

    if (!keyword) {
      logger.error('Please add a search query first')
      throw new AppError('Please add a search query first', 400)
    }

    const searchUserService = new SearchUserService()

    const users = await searchUserService.execute(
      keyword as string,
      get(request, 'user.userId', '')
    )

    return response.status(201).json(users)
  }
}

export default SearchUserController
