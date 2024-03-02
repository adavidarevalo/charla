import 'dotenv/config'
import 'express-async-errors'
import express, {
  type NextFunction,
  type Request,
  type Response
} from 'express'
import AppError from '@shared/errors/app_error'
import cors from 'cors'
import { errors } from 'celebrate'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use(errors())

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
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
)

const port = process.env.PORT ?? 4000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
