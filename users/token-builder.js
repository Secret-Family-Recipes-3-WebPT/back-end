const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'



module.exports = (user) => {
    const payload = {
        subject: user.user_id, // may change depending on migration. 
        username: user.username
    }

    const options = {
        expiresIn: '1h'
    }
    const token = jwt.sign(payload, JWT_SECRET, options)
    return token
}