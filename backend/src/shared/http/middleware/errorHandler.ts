import AppError from '@shared/errors/app_error'
import { type NextFunction, type Request, type Response } from 'express'

const errorHandlerMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}

export default errorHandlerMiddleware
