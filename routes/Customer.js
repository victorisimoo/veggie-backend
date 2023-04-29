'use strict'

var express = require('express');
var CustomerController = require('../controllers/CustomerController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

api.post('/create-customer', CustomerController.createCustomer);
api.post('/login-customer', CustomerController.loginCustomer);
api.get('/get-customers/:type?/:filter?',auth.authenticated,  CustomerController.getAllCustomers);
api.post('/create-customer-by-admin', auth.authenticated, CustomerController.createCustomerByAdmin);
api.get('/get-customer/:id', auth.authenticated, CustomerController.getCustomerInfoById);
api.put('/update-customer/:id', auth.authenticated, CustomerController.updateCustomer);
api.delete('/delete-customer/:id', auth.authenticated, CustomerController.deleteCustomer);

module.exports = api;