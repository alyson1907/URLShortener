const exp = require('express')
const router = exp.Router()

// services
import * as short from './urlShortener'

router.post('/shorten', short.createURL)

export default router
