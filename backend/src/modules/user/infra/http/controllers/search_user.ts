import SearchUserService from '@modules/user/services/search_user.service'
import { type NextFunction, type Request, type Response } from 'express'
import get from 'lodash/get'
import logger from 'src/config/logger.config'
import { container } from 'tsyringe'
import createError from 'http-errors'

interface IRequest extends Request {
  user?: {
    userId: string
  }
}

class SearchUserController {
  public async execute(
    request: IRequest,
    response: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    try {
      const keyword = request.query.search

      if (!keyword) {
        logger.error('Please add a search query first')
        throw new createError.BadRequest('Please add a search query first')
      }

      const searchUserService = container.resolve(SearchUserService)

      const users = await searchUserService.execute(
        keyword as string,
        get(request, 'user.userId', '')
      )

      return response.status(201).json(users)
    } catch (error) {
      next(error)
    }
  }
}

export default SearchUserController
