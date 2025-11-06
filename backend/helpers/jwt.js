// const expressJwt = require('express-jwt');
const { expressjwt: expressJwt } = require('express-jwt'); // <-- note the destructuring

function authJwt() {
    const secret = process.env.secret
    return expressJwt({
        secret,
        algorithms: ['HS256']
    })
}

module.exports = authJwt;