const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { verifyAuthorization } = require('../utilities/verify')
const { dataFill, login, register, update } = require('../controllers/authorize')

router.get(`/`, asyncHandler(dataFill))

router.post(`/login`, asyncHandler(login)).post(`/register`, asyncHandler(register))

router.put(`/update/`, verifyAuthorization, asyncHandler(update))

module.exports = router

