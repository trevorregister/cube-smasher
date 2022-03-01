const jwt = require('jsonwebtoken')

exports.auth = function (req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) return res.status(401).send('User not authorized')

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()

    }
    catch (error){
        res.status(400).send('Invalid token')
    }
}

exports.role = function (req, res, next){
    if (req.user.role==='customer') return res.status(403).send('Access forbidden')

    next()
}

