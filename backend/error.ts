import { Request, Response } from 'express'

interface Error {
  status?: number
  message?: string
  err?: any
  context?: String
  internal?: boolean
}

const errorHandler = async (error: any, req: Request, res: Response, next: any) => {
  const status = error.status || 500
  res.status(status).json({ error })
}

const createError = (status: number, message: string, err?: Array<any>, context?: String) => {
  const error: Error = new Error()
  error.status = status
  error.message = message
  error.err = err
  error.context = context
  error.internal = true
  return error
}

export { errorHandler, createError }
