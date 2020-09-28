import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { createError } from './error'
import ShortURL from './Models/ShortURL'

const createURL = async (req: Request, res: Response, next: Function) => {
  const body = req.body
  const entity = await ShortURL.create({ short: 'short', original: body.url })
  return res.send('Alrahgh')
}

export { createURL }
