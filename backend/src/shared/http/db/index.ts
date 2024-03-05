import mongoose from 'mongoose'
import logger from 'src/config/logger.config'

void mongoose.connect(process.env.MONGO_DB_URI ?? '').then(() => {
  logger.info('Connected to Mongodb.')
})

mongoose.connection.on('error', (err) => {
  logger.error(`Mongodb connection error : ${err}`)
  process.exit(1)
})

if (process.env.NODE_ENV !== 'prod') {
  mongoose.set('debug', true)
}
