import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { errors } from 'celebrate'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import logger from './../../config/logger.config'
import errorHandlerMiddleware from './middleware/errorHandler'
import './db/index'

const app = express()

if (process.env.NODE_ENV === 'dev') {
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  )
}

app.use(helmet())

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())
app.use(compression())
app.use(cookieParser())
app.use(
  fileUpload({
    useTempFiles: true
  })
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(errors())

app.use(errorHandlerMiddleware)

const port = process.env.PORT ?? 4000
app.listen(port, () => {
  logger.info(`Example app listening on port ${port}!`)
})
