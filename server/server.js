//API PACKAGES - note bodyParser removed - new version of express has it installed already (see below)
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv').config()
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const application = express()
const data = require('./dummy') 

//ROUTE EXPRESS
const authorize = require('./router/authorize')
const products = require('./router/product')
const orders = require('./router/orders')
const users = require('./router/user')
const __dirname = path.resolve()


//startup  middleware express
application.use((request, response, next) => {
    response.header('Access-Control-Allow-Credentials', true)
    next()
}).use(express.json()).use(express.urlencoded({ extended: true })).use(cors({ 
    origin: process.env.CLIENT_URL, 
    credentials: true 
})).use(helmet()).use(morgan('common'))

//PAYPAL SETUP
application.get(`/api/keys/paypal`, (request, response) => {
    response.send(process.env.PAYPAL_CLIENT || 'sandbox')
})

//API ROUTING
application.use(`/api/auth`, authorize)
.use(`/api/products`, products)
.use(`/api/orders`, orders)
.use(`/api/users`, users)

//File handle
application.use(express.static(path.join(__dirname, '/client/build')))
application.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '/client/build/index.html'))
})

//Error handle
application.use((error, request, response, next) => {
    response.status(500).send({ message: error.message })
})

//NOTE: For local database mongodb use IP address not localhost i.e. 127.0.0.1 in dotenv file
mongoose.connect(process.env.MONGO_LOCAL).then(() => {
    application.listen(process.env.PORT || 8800, () => console.log(`Server Online`))
}).catch((error) => console.log(error.message))



