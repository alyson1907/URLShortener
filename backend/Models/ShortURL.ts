import mongoose from 'mongoose'
import { AutoIncrement } from '../initializeDB'

const schema = new mongoose.Schema(
  {
    _id: Number,

    short: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },

    original: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { _id: false, timestamps: true }
)

schema.plugin(AutoIncrement)

export default mongoose.model('ShortURL', schema)
