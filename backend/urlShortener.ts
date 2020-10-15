import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { createError, errorKeys } from './error'
import Base64 from 'js-base64'
import ShortURL from './Models/ShortURL'
import * as yup from 'yup'
import { IShortURL } from 'types'

const createURL = async (req: Request, res: Response, next: Function) => {
  try {
    // Validating data
    const validationSchema = yup.object().shape({ url: yup.string().url().required() }).noUnknown(true).strict(true)
    await validationSchema.validate(req.body)
    const { url } = req.body

    const trx = await mongoose.startSession()
    trx.startTransaction()
    // Inserts `null` so we can get Document's id to encode
    const [newEntry] = await ShortURL.create([{ short: null, original: url, clicks: 0 }], { session: trx })
    const shortened = Base64.encode(newEntry._id.toString(), true)
    const updated = await ShortURL.findByIdAndUpdate(newEntry._id, { short: shortened }, { new: true, session: trx })
    trx.commitTransaction()

    return res.status(201).send(updated)
  } catch (err) {
    next(err)
  }
}

const redirect = async (req: Request, res: Response, next: Function) => {
  const containsOnlyDigits = (str: string) => str.match(/^\d+$/)

  try {
    const { short } = req.params
    if (!short)
      throw createError(400, errorKeys.invalidParam, 'Bad Request. `short` param is required', ['req.params.short'])
    // Decoding
    const id = Base64.decode(short)
    if (!id || !containsOnlyDigits(id))
      throw createError(400, errorKeys.invalidShortUrl, 'Bad Request. The decoded ShortURL was invalid', ['id'])

    const found = await ShortURL.findById(id)
    if (!found)
      throw createError(404, errorKeys.notFound, 'Not Found. URL provided could not be found', ['req.params.short'])
    // Click Count
    await found.update({ clicks: found.clicks + 1 }).exec()
    return res.status(301).writeHead(301, { Location: found.original }).send()
  } catch (err) {
    next(err)
  }
}

const getInfo = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params

    if (id) {
      const found = await ShortURL.findById(id)
      if (!found)
        throw createError(404, errorKeys.notFound, 'Not Found. Short URL could not be found', ['id'], '/url/info/:id')
      return res.json(found).send()
    }

    const foundArr = await ShortURL.find(req.query)
    return res.json({ data: foundArr }).send()
  } catch (err) {
    next(err)
  }
}

export { createURL, redirect, getInfo }
