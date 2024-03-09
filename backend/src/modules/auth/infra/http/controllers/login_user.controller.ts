import { IJWTProvider } from '@modules/auth/providers/jsonWebToken/model/IJWTProvider'
import LoginUserService from '@services/login_user.service'

import { type Request, type Response } from 'express'
import { container, inject, injectable } from 'tsyringe'

@injectable()
class LoginUserController {
  constructor(
    @inject('JWTProvider') private readonly JWTProvider: IJWTProvider
  ) {}

  public async execute(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { email, password } = request.body

    const loginUserService = container.resolve(LoginUserService)

    const user = await loginUserService.execute({ email, password })

    const accessToken = this.JWTProvider.generateToken({
      userId: user?._id ?? '',
      expiresIn: '1d',
      secret: process.env.ACCESS_TOKEN_SECRET ?? ''
    })
    const refreshToken = this.JWTProvider.generateToken({
      userId: user?._id ?? '',
      expiresIn: '30d',
      secret: process.env.REFRESH_TOKEN_SECRET ?? ''
    })

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/v1/auth/refreshtoken',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
    })

    return response.json({
      message: 'Login Success.',
      user: {
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        status: user?.status,
        _id: user?._id,
        token: accessToken,
        refreshToken
      }
    })
  }
}

export default LoginUserController
