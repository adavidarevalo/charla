import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { container } from 'tsyringe'
import CreateUserController from '../controllers/create_user'
import LoginUserController from '../controllers/login_user'
import LogOutUserController from '../controllers/logout'
import RefreshTokenController from '../controllers/refresh_token'

class AuthRoutes {
  private readonly router: Router

  constructor() {
    this.router = Router()
    this.setupRoutes()
  }

  private setupRoutes(): void {
    const createUserController = container.resolve(CreateUserController)
    const loginUserController = container.resolve(LoginUserController)
    const logOutUserController = new LogOutUserController()
    const refreshTokenController = container.resolve(RefreshTokenController)

    this.router.post(
      '/register',
      celebrate({
        [Segments.BODY]: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          status: Joi.string(),
          picture: Joi.string()
        }
      }),
      createUserController.create.bind(createUserController)
    )

    this.router.post(
      '/login',
      celebrate({
        [Segments.BODY]: {
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      }),
      loginUserController.execute.bind(loginUserController)
    )

    this.router.post(
      '/logout',
      logOutUserController.execute.bind(logOutUserController)
    )

    this.router.post(
      '/refreshtoken',
      celebrate({
        [Segments.COOKIES]: {
          refreshToken: Joi.string().required()
        }
      }),
      refreshTokenController.execute.bind(refreshTokenController)
    )
  }

  public getRouter(): Router {
    return this.router
  }
}

export default new AuthRoutes().getRouter()
