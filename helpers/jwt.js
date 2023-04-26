'use-strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'web-development-url-2023';

exports.createToken = (user) => {
    var payload = {
        sub: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix()
    };

    return jwt.encode(payload, secret);
}
