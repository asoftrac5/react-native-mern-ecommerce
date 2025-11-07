// const expressJwt = require('express-jwt');
const { expressjwt: expressJwt } = require('express-jwt'); // <-- note the destructuring

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

// token = { header, payload, signature }
async function isRevoked(req, token) {
  // Block non-admin users from protected routes
  if (!token.payload.isAdmin) {
    return true;      // revoke token → UnauthorizedError
  }
  return false;       // token is valid
}

module.exports = authJwt;