import { authMiddleware } from '@shared/http/middleware/auth.middleware'
import { Router } from 'express'
import SearchUserController from '../controllers/search_user'
// import { container } from 'tsyringe'

class UserRoutes {
  private readonly router: Router

  constructor() {
    this.router = Router()
    this.setupRoutes()
  }

  private setupRoutes(): void {
    const searchUserController = new SearchUserController()
    this.router.get('/', authMiddleware, searchUserController.execute)
  }

  public getRouter(): Router {
    return this.router
  }
}

export default new UserRoutes().getRouter()
