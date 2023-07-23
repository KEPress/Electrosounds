const router = require('express').Router()
const asyncHandle = require('express-async-handler')
const { getAll, getSlug, getProduct }  = require('../controllers/product')

//NOTE Order placement of routes are important as it affects functionality

router.get(`/`, getAll).get(`/:slug`, asyncHandle(getSlug)).get(`/product/:id`, asyncHandle(getProduct))


module.exports = router
