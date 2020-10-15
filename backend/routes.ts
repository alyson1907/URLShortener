const exp = require('express')
const router = exp.Router()

// services
import * as short from './urlShortener'

router.post('/shorten', short.createURL)
router.get('/url/info', short.getInfo)
router.get('/url/info/:id', short.getInfo)
router.get('/:short', short.redirect)

export default router
