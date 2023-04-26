'use strict'

var express = require('express');
var AdministratorController = require('../controllers/AdministratorController');

var api = express.Router();

api.post('/create-administrator', AdministratorController.createAdmin);
api.post('/login-administrator', AdministratorController.loginAdmin);

module.exports = api;