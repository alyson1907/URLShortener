import { Request, Response } from 'express'
import { ValidationError } from 'yup'

interface Error {
  status?: number
  message?: string
  err?: any
  context?: String
  internal?: boolean
}

const errorHandler = async (error: any, req: Request, res: Response, next: any) => {
  console.log('[ErrorHandler] ', error)
  let status = error.status || 500
  let resBody = { error: {} }

  // Handling errors
  // yup validation
  if (error instanceof ValidationError) {
    status = 400
    resBody.error = error
  }

  res.status(status).json(resBody)
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
