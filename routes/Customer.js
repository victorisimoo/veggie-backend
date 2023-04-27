'use strict'

var express = require('express');
var CustomerController = require('../controllers/CustomerController');

var api = express.Router();

api.post('/create-customer', CustomerController.createCustomer);
api.post('/login-customer', CustomerController.loginCustomer);
api.get('/get-customers/:type?/:filter?', CustomerController.getAllCustomers);

module.exports = api;