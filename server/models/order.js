const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

    orders: [{
        //note: key names must correspond with redux initialValues
        items: { type: Object, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        shipping: { type: Number, required: true },
        tax:  { type: Number, required: true },
    }],
    //note: variable type also important as the address in redux is object-type
    shipping: {
        address: { type: Object, required: true },
        location: { 
            lat: Number, 
            lng: Number, 
            address: String, 
            name: String, 
            vicinity: String,
            googleAddressId: String
         }
    },
    user: {
        email: { type: String, required: true },
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            refer: 'Users', 
            required: true 
        }
    },
    result: { type: Object },
    paymentMethod: { type: String, required: true },
    totalCost: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidDate: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliverDate: { type: Date }
   
}, { timestamps: true })

module.exports = mongoose.model('Orders', OrderSchema)