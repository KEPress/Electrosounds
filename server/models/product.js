const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        unique: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    brand: {
        type: String,
        required: true
    },

    category: {
        type: Array,
        default: new Array()
    },

    image: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    reviews: {
        type: Number,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Products', ProductSchema)