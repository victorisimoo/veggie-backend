'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventorySchema = Schema({
    product: {type: Schema.ObjectId, ref: 'producto', required: true},
    count: {type: Number, require: true},
    admin: {type: Schema.ObjectId, ref: 'admin', required: true},
    supplier: {type: String, required: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('Inventory',InventorySchema);