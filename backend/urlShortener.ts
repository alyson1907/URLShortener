import { Request, Response } from 'express'
const createURL = async (req: Request, res: Response, next: Function) => {
  next(new Error('ERRORasdasd'))
  return 'ok'
}

module.exports = {
  createURL,
}
