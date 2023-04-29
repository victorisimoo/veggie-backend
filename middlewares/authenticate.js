'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'web-development-url-2023';

exports.authenticated = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).send({message: 'The request does not have the authentication header'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    var segment = token.split('.');

    if(segment.length != 3){
        return res.status(403).send({message: 'Invalid token'});
    }else {
        try {
            var payload = jwt.decode(token, secret);
            if(payload.exp <= moment().unix()){
                return res.status(403).send({message: 'The token has expired'});
            }
        } catch (error) {
            return res.status(403).send({message: 'Invalid token'});
        }
    }

    req.user = payload;
    next();
}