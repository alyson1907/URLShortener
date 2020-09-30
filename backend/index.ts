import dotenv from 'dotenv'
dotenv.config()
import './initializeDB'
const env = process.env.NODE_ENV || 'development'
import morgan from 'morgan'
import express from 'express'
import router from './routes'
import { errorHandler } from './error'

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev')) // logger
app.use(express.json()) // parsing body
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => console.log(`[${env}] - Server listening on port ${PORT}`))
