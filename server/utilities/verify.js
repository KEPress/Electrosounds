const jwt = require('jsonwebtoken')

exports.generateToken = (user) => {
    //set token and expiration in 3hrs
    return jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '3h'})
}

exports.verifyToken = (request, response, next) => {
    const header = request.headers.token
    if (header) {
        //const token = header.split(' ')[1] //can also use split operand
        const token = header.slice(7, header.length)
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error) return response.status(403).json(error)
            else request.user = decode
            next()
        })
    } else return response.status(401).json({ message: 'You are not authenticated'})
   
}

exports.verifyAuthorization = (request, response, next) => {
    this.verifyToken(request, response, () => {
        if (request.user._id || request.user.isAdmin) next()
        else return response.status(403).json({ message:'Unauthorized Access'})
    })
}


exports.verifyAdministration = (request, response, next) => {
    this.verifyToken(request, response, () => {
        if (request.user.isAdmin) next()
        else return response.status(403).json({ message: 'Unauthorized Access'})
    })
}