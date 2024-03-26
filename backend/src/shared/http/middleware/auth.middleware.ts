import createError from 'http-errors'
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): void => {
  if (!req.headers.authorization) {
    next(createError.Unauthorized())
    return
  }

  const token = req.headers.authorization.split(' ')[1]

  const tokenContent = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)

  if (!tokenContent) {
    next(createError.Unauthorized())
    return
  }

  req.user = tokenContent
  next()
}
