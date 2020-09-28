const exp = require('express')
const router = exp.Router()

// services
const short = require('./urlShortener')

router.post('/shorten', short.createURL)

export default router
