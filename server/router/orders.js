const router = require('express').Router()
const asyncHandle = require('express-async-handler')
const { verifyAuthorization } = require('../utilities/verify')
const { placeOrder, fetchOrder, payOrder, stripePay } = require('../controllers/orders')


router.post(`/`, verifyAuthorization, asyncHandle(placeOrder))

router.get(`/:orderId`, verifyAuthorization, asyncHandle(fetchOrder))

router.put(`/:orderId/pay`, verifyAuthorization, asyncHandle(payOrder)).put(`/stripe/:orderId`, verifyAuthorization, asyncHandle(stripePay))

module.exports = router