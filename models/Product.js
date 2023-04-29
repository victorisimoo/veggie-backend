'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    galery: [{type: Object, required: false}],
    coverPage: {type: String, required: true},
    price: {type: Number, required: true},
    shortdescription: {type: String, required: true},
    extensivedescription: {type: String, required: true},
    stock: {type: Number, required: true},
    numberShops: {type: Number, default: 0, required: true},
    numberPoints: {type: Number, default: 0, required: true},
    category: {type: String, required: true},
    status: {type: String, default: 'Edit', required: true},
    createdAt: {type: Date, default: Date.now(), required: true},
})

module.exports = mongoose.model('Product', ProductSchema);