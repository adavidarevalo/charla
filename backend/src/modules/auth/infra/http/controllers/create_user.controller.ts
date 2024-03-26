import { IJWTProvider } from '@modules/auth/providers/jsonWebToken/model/IJWTProvider'
import CreateUserService from '@services/create_user.service'
import { type NextFunction, type Request, type Response } from 'express'
import { container, inject, injectable } from 'tsyringe'

@injectable()
class CreateUserController {
  constructor(
    @inject('JWTProvider') private readonly JWTProvider: IJWTProvider
  ) {}

  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<any> | any> {
    try {
      const { name, email, password, status, picture = '' } = request.body

      const createCustomersService = container.resolve(CreateUserService)

      const userSaved = await createCustomersService.execute({
        name,
        email,
        password,
        status,
        picture
      })

      const accessToken = this.JWTProvider.generateToken({
        userId: userSaved?._id ?? '',
        expiresIn: '1d',
        secret: process.env.ACCESS_TOKEN_SECRET ?? ''
      })
      const refreshToken = this.JWTProvider.generateToken({
        userId: userSaved?._id ?? '',
        expiresIn: '30d',
        secret: process.env.REFRESH_TOKEN_SECRET ?? ''
      })

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/v1/auth/refreshtoken',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
      })

      return response.status(201).json({
        message: 'Register Success.',
        user: {
          name: userSaved?.name,
          email: userSaved?.email,
          picture: userSaved?.picture,
          status: userSaved?.status,
          _id: userSaved?._id,
          token: accessToken,
          refreshToken
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

export default CreateUserController
