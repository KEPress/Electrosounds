const Order = require('../models/order')
const stripe = require('stripe')(process.env.STRIPE_KEY)


exports.placeOrder = async (request, response, next) => {

    try { 
       const { _id, email } = request.body.user
       const place = new Order({
            orders: request.body.cart,
            shipping: request.body.shipping,
            paymentMethod: request.body.payment,
            user: { email: email, userId: _id },
            totalCost: request.body.total
       })
       const order = await place.save()
       return response.status(200).json(order)
    } catch (error) {
        next(error)
    }
}

exports.fetchOrder = async (request, response, next) => {

    try {
        const order = await Order.findById(request.params.orderId)
        if (!order) return response.status(404).json({ message: 'Order not found'})
        else return response.status(200).json(order)
    } catch (error) {
        next(error)
    }
}

exports.payOrder = async (request, response, next) => {

    try {
        const order = await Order.findById(request.params.orderId)
        if (order) {
            order.isPaid = true
            order.paidDate = Date.now()
            order.result = {
                id: request.body.orderId,
                status: request.body.status,
                update: request.body.update_time,
                email: request.body.email_address
            }
            const update = await order.save()
            return response.status(200).json({ message: 'Order Paid', order: update})
        } else {
            return response.status(404).json({ message: 'Order not found'})
        }
    } catch (error) {
        next (error)
    }
}


exports.stripePay = async (request, response, next) => {

    try {
        const order = await Order.findById(request.params.orderId)
        const { shipping, user, amount, tokenId } = request.body
        if (order) {
            order.isPaid = true
            order.paidDate = Date.now()
            order.result = { shipping: shipping, email: user.email }
            const update = await order.save()
            const payIntent = await stripe.charges.create({
                source: tokenId,
                amount: amount,
                currency: 'usd'
            })
            if (!payIntent) return response.status(500).json({ message: 'Pay Error'})
            else return response.status(200).json({ update, payIntent})
        } else return response.status(404).json({ message: 'Order not found'})
    } catch (error) {
        next(error)
    }
}




  