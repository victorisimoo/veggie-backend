'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    country: {type: String, default:'Guatemala', required: false},
    email: {type: String, required: true},
    password : {type: String, required: true},
    profile_photo: {type: String, default: 'profile.png', required: false},
    phone: {type: String, required: false},
    gender: {type: String, required: false},
    birthdate: {type: String, required: false},
    address: {type: String, required: false},
    idDocument: {type: String, required: false},
})

module.exports = mongoose.model('Customer', CustomerSchema);