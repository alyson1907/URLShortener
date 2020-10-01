import mongoose from 'mongoose'

interface IShortURL extends mongoose.Document {
  short: string
  original: string
  clicks: number
}
