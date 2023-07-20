const User  = require('../../models/User/User')

const register = async (req, res) => {
    console.log(req.body)
    const user = await User.create(req.body)
    res.json({user})
}

const login = async (req, res) => {

}

module.exports = {
    register,
    login
}
