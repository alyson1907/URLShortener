const env = process.env.NODE_ENV || 'development'
import express, { Request, Response } from 'express'
import router from './routes'
const app = express()
import errorHandler from './errorHandler'

const PORT = process.env.PORT || 3000

app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () => console.log('Server listening on port', PORT))
