const env = process.env.NODE_ENV || 'development'
import dotenv from 'dotenv'
dotenv.config()
import './initializeDB'
import express from 'express'
import router from './routes'
import { errorHandler } from './error'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => console.log('Server listening on port', PORT))
