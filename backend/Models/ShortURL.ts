import mongoose from 'mongoose'
import { IShortURL } from 'types'
import { AutoIncrement } from '../initializeDB'

const schema = new mongoose.Schema(
  {
    _id: Number,

    short: {
      type: String,
      trim: true,
      unique: true,
    },

    original: {
      type: String,
      required: true,
      trim: true,
    },

    clicks: {
      type: Number,
      default: 0,
    },
  },
  { _id: false, timestamps: true }
)

schema.plugin(AutoIncrement)

export default mongoose.model<IShortURL>('ShortURL', schema)
