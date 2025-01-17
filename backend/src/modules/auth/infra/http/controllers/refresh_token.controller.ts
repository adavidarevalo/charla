import { IJWTProvider } from '@modules/auth/providers/jsonWebToken/model/IJWTProvider'
import FindByIdUserService from '@services/find_user.service'
import { type NextFunction, type Request, type Response } from 'express'
import { container, inject, injectable } from 'tsyringe'
import createHttpError from 'http-errors'
import get from 'lodash/get'

@injectable()
class RefreshTokenController {
  constructor(
    @inject('JWTProvider') private readonly JWTProvider: IJWTProvider
  ) {}

  public async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const token = request.cookies.refreshToken

      const check = this.JWTProvider.verifyToken(
        `${token}`,
        process.env.REFRESH_TOKEN_SECRET ?? ''
      )

      if (!check) {
        throw new createHttpError[400]('Please Login')
      }

      const findByIdUserService = container.resolve(FindByIdUserService)

      const user = await findByIdUserService.execute(
        `${get(check, 'userId', '')}`
      )

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

      return response.status(200).json({
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

export default RefreshTokenController
