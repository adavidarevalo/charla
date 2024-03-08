import AppError from '@shared/errors/app_error'
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): void => {
  if (!req.headers.authorization) {
    throw new AppError('Authorization header is missing', 401)
  }

  const token = req.headers.authorization.split(' ')[1]

  const tokenContent = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)

  if (!tokenContent) {
    throw new AppError('Invalid token', 401)
  }

  req.user = tokenContent
  next()
}
