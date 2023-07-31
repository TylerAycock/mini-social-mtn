require('dotenv').config()
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const createToken = (username, id) => {
    return jwt.sign(
        {
            username,
            id,
        },
        SECRET,
        {
            expiresIn: '2 days',
        }
    )
}

module.exports = {
    login: async (req, resp) => {
        console.log('login')
        let { username, password } = req.body
        let token = createToken(username, password)
        resp.status(200).send(token)
    },
    register: async (req, resp) => {
        console.log('register')
        resp.sendStatus(200)
    }
}
