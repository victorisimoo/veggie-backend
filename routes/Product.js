'use strict'

var express = require('express');
var productController = require('../controllers/ProductController');
var api = express.Router();
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/products'});


api.post('/create-product', [auth.authenticated, path], productController.createProduct);
api.get('/get-all-products/:filter?', auth.authenticated, productController.getAllProducts)
api.get('/get-images/:img?', productController.get_images);

api.get('/get-product-info-by-id/:id', auth.authenticated, productController.getProductInfoById);
api.put('/update-product/:id', [auth.authenticated, path], productController.updateProduct);
api.delete('/delete-product/:id', auth.authenticated, productController.deleteProduct);

api.get('/get-inventary-product/:id', auth.authenticated, productController.getAllInventory);
api.delete('/delete-inventory-product/:id', auth.authenticated, productController.deleteInventary);

module.exports = api;