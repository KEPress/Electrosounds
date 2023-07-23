const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utilities/verify')

//const { users } = require('../dummy')

/***
 * exports.dataFill = async (request, response, next) => {

    try {
        const list = await User.insertMany(users)
        return response.status(200).json(list)
    } catch (error) {
        return next(error)
    }
}
 */


exports.login = async (request, response, next) => {

   try {
        const user = await User.findOne({ email: request.body.email })
        if (!user) return response.status(404).json({ message: 'Email not found'})
        else {
            const pass = await bcrypt.compare(request.body.password, user.password)
            if (!pass) return response.status(400).json({ message: 'Invalid Password'})
            else {
                const token = generateToken(user)
                const { password, ...other } = user._doc
                return response.status(200).json({...other, token})
            }
        }
    } catch (error) {
        return next(error)
    }
}

exports.register = async (request, response, next) => {

    try {
       
        const check = await User.findOne({ email: request.body.email })
        if (check) return response.status(404).json({ message: 'Email already registered'})
        else {
            const register = new User({
                name: request.body.name,
                surname: request.body.surname,
                email: request.body.email,
                password: bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10))
            })
            const user = await register.save()
            const token = generateToken(user)
            //destructure to leave out password 
            const { password, ...other} = user._doc
            return response.status(200).json({...other, token})
        }
    } catch (error) {
        next(error)
    }
}

exports.update = async (request, response, next) => {

    try {
        const user = await User.findById(request.user._id)
        if (user) {
          if (request.body.password) {
            request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10))
          }
          const update = await User.findByIdAndUpdate(request.user._id, { $set: request.body }, { new: true })
          const token = generateToken(update)
          const { password, ...other } = update._doc
          return response.status(200).json({...other, token})
        } else return response.status(404).json({ message:'User not found'})
    } catch (error) {
        next(error)
    }
  
}


