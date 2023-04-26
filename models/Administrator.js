'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdministratorSchema = Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password : {type: String, required: true},
    phone: {type: String, required: true},
    rol: {type: String, required: true},
    idDocument: {type: String, required: true},
})

module.exports = mongoose.model('Administrator', AdministratorSchema);