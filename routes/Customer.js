'use strict'

var express = require('express');
var CustomerController = require('../controllers/CustomerController');

var api = express.Router();

api.post('/create-customer', CustomerController.createCustomer);
api.post('/login-customer', CustomerController.loginCustomer);

module.exports = api;