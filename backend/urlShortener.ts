import { Request, Response } from 'express'
import mongoose, { Mongoose } from 'mongoose'
import { createError } from './error'
import Base64 from 'js-base64'
import ShortURL from './Models/ShortURL'

const createURL = async (req: Request, res: Response, next: Function) => {
  try {
    const { url } = req.body
    const trx = await mongoose.startSession()
    trx.startTransaction()
    // Inserts `null` so we can get Document's id to encode
    const [newEntry] = await ShortURL.create([{ short: null, original: url }], { session: trx })
    const shortened = Base64.encode(newEntry._id.toString(), true)
    console.log(shortened)
    const updated = await ShortURL.findByIdAndUpdate(newEntry._id, { short: shortened.toString() }, { new: true, session: trx })
    trx.commitTransaction()
    
    return res.send(updated)
  } catch (err) {
    next(err)
  }
}

export { createURL }
