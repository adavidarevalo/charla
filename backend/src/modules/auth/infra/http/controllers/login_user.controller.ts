import { IJWTProvider } from '@modules/auth/providers/jsonWebToken/model/IJWTProvider'
import LoginUserService from '@services/login_user.service'

import { type NextFunction, type Request, type Response } from 'express'
import { container, inject, injectable } from 'tsyringe'

@injectable()
class LoginUserController {
  constructor(
    @inject('JWTProvider') private readonly JWTProvider: IJWTProvider
  ) {}

  public async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
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
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        secure: true,
        sameSite: 'none'
      })

      return response.json({
        message: 'Login Success.',
        user: {
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          status: user?.status,
          _id: user?._id,
          token: accessToken
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

export default LoginUserController
