import { Request, Response } from 'express'
import { createError } from './error'

const createURL = async (req: Request, res: Response, next: Function) => {
  next(createError(302, 'my error', [1, 3, 5, 7]))
  return 'ok'
}

module.exports = {
  createURL,
}
