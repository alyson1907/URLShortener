import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    shortened: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    original: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('ShortenedURL', schema)
