// const expressJwt = require('express-jwt');
const { expressjwt: expressJwt } = require('express-jwt'); // <-- note the destructuring

function authJwt() {
    const secret = process.env.secret
    const api = process.env.api
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

module.exports = authJwt;