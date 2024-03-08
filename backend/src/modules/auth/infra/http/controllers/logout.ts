import { type Request, type Response } from 'express'

class LogoutTokenController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    response.clearCookie('refreshToken', {
      path: '/api/v1/auth/refreshtoken'
    })

    return response.status(204).send()
  }
}

export default LogoutTokenController
