import { AssertionError } from 'assert'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { ValidationError } from 'yup'

interface IError {
  status?: number
  key?: string
  message?: string
  err?: any
  context?: string
  internal?: boolean
}

const errorHandler = async (err: any, req: Request, res: Response, next: any) => {
  console.log('[ErrorHandler] ', err)
  let status = err.status || 500
  let key = null
  let message = err.message
  let context = err.context || null
  let error = err
  // Response
  let resBody = err

  // Handling errors
  if (!err.internal) {
    // yup validation
    if (err instanceof ValidationError) {
      status = 400
      key = errorKeys.validation
    } else if (err instanceof AssertionError) {
      status = 400
      key = errorKeys.assertion
    } else if (err instanceof mongoose.Error.CastError) {
      status = 400
      key = errorKeys.cast
    }
    resBody = createError(status, key, message, error, context, false)
  }

  return res.status(status).json(resBody).send()
}

const createError = (
  statusCode: number,
  key: string,
  message: string,
  err?: Array<any>,
  context?: string,
  internal = true
) => {
  const error: IError = new Error()
  error.status = statusCode
  error.key = key
  error.message = message
  error.err = err
  error.context = context
  error.internal = internal
  return error
}

const errorKeys = {
  invalidParam: 'INVALID_PARAM',
  invalidShortUrl: 'INVALID_SHORT_URL',
  notFound: 'NOT_FOUND',
  validation: 'VALIDATION_ERROR',
  assertion: 'ASSERTION_ERROR',
  cast: 'CAST_ERROR',
}

export { errorHandler, createError, errorKeys }
