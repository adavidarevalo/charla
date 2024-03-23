import 'dotenv/config'
import 'express-async-errors'
import 'reflect-metadata'
import '@shared/container'
import './db/index'

import express from 'express'
import cors from 'cors'
import { errors } from 'celebrate'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'

import logger from './../../config/logger.config'
import errorHandlerMiddleware from './middleware/error_handler.middleware'
import routes from './routes'
import rateLimiterConfig from '../../config/rate_limiter.config'
import { Server } from 'socket.io'
import socketServer from './socket/server'

const app = express()

if (process.env.NODE_ENV === 'dev') {
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  )
}

app.use(rateLimit(rateLimiterConfig))

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

app.use('/api/v1', routes)

app.use(errors())

app.use(errorHandlerMiddleware)

const port = process.env.PORT ?? 4000
const server = app.listen(port, () => {
  logger.info(`Example app listening on port ${port}!`)
})

const io = new Server(server, {
  pingInterval: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  socketServer(socket, io)
})
