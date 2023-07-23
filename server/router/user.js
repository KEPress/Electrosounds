const router = require('express').Router()
const asyncHandle = require('express-async-handler')
const { verifyAuthorization } = require('../utilities/verify')
const { getUserOrders } = require('../controllers/user')

//NOTE: Remember the '/:id' endpoint must be the same name when using  request.params.id
router.get(`/orders/mine`, verifyAuthorization, asyncHandle(getUserOrders))

module.exports = router