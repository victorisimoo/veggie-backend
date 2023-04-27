'use strict'

const Customer = require('../models/Customer');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const createCustomer = async (req, res) => {
    // data from the request
    var params = req.body;
    
    // validate if the email already exists
    var customer_arr = await Customer.find({email: params.email});
    if(customer_arr.length == 0){
        if(params.password){
            try {
                const hash = await new Promise((resolve, reject) => {
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(hash);
                        }
                    });
                });

                if (hash) {
                    params.password = hash;
                    var register = await Customer.create(params);
                    res.status(200).send({message: register});
                }
            } catch (error) {
                res.status(500).send({message: "An error occurred during password hashing"});
            }
        } else {
            res.status(400).send({message: "Register failed, password is required"});
        }
    } else {
        res.status(400).send({message: "The email already exists"});
    }
};

const loginCustomer = async (req, res) => {
    var params = req.body;
    var customer_arr = await Customer.find({email: params.email});

    if(customer_arr.length == 0){
        res.status(400).send({message: "The email doesn't exists"});
    } else {
        try {
            const match = await new Promise((resolve, reject) => {
                bcrypt.compare(params.password, customer_arr[0].password, function(err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            });
        
            if (match) {
                res.status(200).send({message: customer_arr[0], token: jwt.createToken(customer_arr[0])});
            } else {
                res.status(400).send({message: "The password is incorrect"});
            }
        } catch (error) {
            res.status(500).send({message: "An error occurred during password comparison"});
        }
    }
}

const getAllCustomers = async (req, res) => {
    
    var type = req.params['type'];
    var filter = req.params['filter'];

    if(type != 'name' && type != 'email'){
        var customers = await Customer.find();
        res.status(200).send({data: customers});
    }else {
        if(type == 'name'){
            let regx = await Customer.find({name: new RegExp(filter, 'i')});
            res.status(200).send({data: regx});
        }else if (type == 'email'){
            let regx = await Customer.find({email: new RegExp(filter, 'i')});
            res.status(200).send({data: regx});
        }
    }   
}


module.exports = {
    createCustomer, 
    loginCustomer, 
    getAllCustomers
}