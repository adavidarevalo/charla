import { type NextFunction, type Request, type Response } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.headers.authorization) {
      next(createHttpError.Unauthorized())
      return
    }

    const token = req.headers.authorization.split(' ')[1]

    const tokenContent = jwt.verify(token, `${process.env.JWT_SECRET}`)

    if (!tokenContent) {
      next(createHttpError.Unauthorized())
      return
    }

    req.user = tokenContent
    next()
  } catch (error) {
    next(createHttpError.Unauthorized())
  }
}
