const Product = require('../models/product')
//const { products } = require('../dummy')

//SAMPLE FILL
/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns sample data from dummy file
 * 
exports.dataFill = async (request, response) => {

    try {
        const productList = await Product.insertMany(data.products)
        return response.status(200).json(productList)
    } catch (error) {
        return response.status(500).json(error)
    }
}
 * 
 */

//FETCH ALL PRODUCTS
exports.getAll = async (request, response) => {

    try {
         let products
         const query = request.query.new  //fetch most recent 
         const category = request.query.category //fetch by category
         if (query) products = await Product.find().sort({ createdAt: -1}).limit(5)
         else if (category) products = await Product.find({ category: { $in: [category] } })
         else products = await Product.find()
         return response.status(200).json(products)
    } catch (error) {
        return response.status(500).json(error)
    }
}

//FETCH PRODUCT VIA SLUG
exports.getSlug = async (request, response, next) => {

    try {
        const slug = await Product.findOne({ slug: request.params.slug })
        return response.status(200).json(slug)
    } catch (error) {
        return next(error)
    }
}

//FETCH PRODUCT VIA ID
exports.getProduct = async (request, response, next) => {

    try {
        const product = await Product.findById(request.params.id)
        return response.status(200).json(product)
    } catch (error) {
        return next(error)
    }
}