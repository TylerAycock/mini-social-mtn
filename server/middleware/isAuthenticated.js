require('dotenv').config()
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        //this is the username/password token that was created 
        const headerToken = req.get('Authorization')


        //this NOT indicates that the token doesn't match up or couldn't be found
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        //this is attempting to match up the token and secret with the stored token 
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
            //this error is thrown bcs we made a mistake in the code somehwere 
        }

        if (!token) {
            //this indicates that the token failed so the user isn't authenticated 
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}