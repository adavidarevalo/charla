import { type Request, type Response } from 'express'

class LogoutTokenController {
  public async execute(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    response.clearCookie('refreshToken', {
      httpOnly: false,
      secure: true,
      sameSite: 'none'
    })

    return response.status(204).send()
  }
}

export default LogoutTokenController
