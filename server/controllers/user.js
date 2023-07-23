const Order = require('../models/order')

exports.getUserOrders = async (request, response, next) => {

    try {
        const userId = request.user._id
        const orders = await Order.find({ 'user.userId':userId})
        return response.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}