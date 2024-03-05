import { IJWTProvider } from '@modules/auth/providers/jsonWebToken/model/IJWTProvider'
import FindByIdUserService from '@modules/auth/services/find_user'
import AppError from '@shared/errors/app_error'
import { type Request, type Response } from 'express'
import { container, inject, injectable } from 'tsyringe'

@injectable()
class RefreshTokenController {
  constructor(
    @inject('JWTProvider') private readonly JWTProvider: IJWTProvider
  ) {}

  public async execute(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const token = request.cookies.refreshToken

    const check = this.JWTProvider.verifyToken(
      `${token}`,
      process.env.REFRESH_TOKEN_SECRET ?? ''
    )

    if (!check) {
      throw new AppError('Please Login', 401)
    }

    const findByIdUserService = container.resolve(FindByIdUserService)

    const user = await findByIdUserService.execute(`${check?.id}`)

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

    return response.status(200).json({
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

export default RefreshTokenController
