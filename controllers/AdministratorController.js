'use strict'

const administrator = require('../models/Administrator');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const createAdmin = async (req, res) => {
    // data from the request
    var params = req.body;
    
    // validate if the email already exists
    var admin_arr = await administrator.find({email: params.email});
    if(admin_arr.length == 0){
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
                    var register = await administrator.create(params);
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

const loginAdmin = async (req, res) => {
    var params = req.body;
    var admin_arr = await administrator.find({email: params.email});

    if(admin_arr.length == 0){
        res.status(400).send({message: "The email doesn't exists"});
    } else {
        try {
            const match = await new Promise((resolve, reject) => {
                bcrypt.compare(params.password, admin_arr[0].password, function(err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            });
        
            if (match) {
                res.status(200).send({message: admin_arr[0], token: jwt.createToken(admin_arr[0])});
            } else {
                res.status(400).send({message: "The password is incorrect"});
            }
        } catch (error) {
            res.status(500).send({message: "An error occurred during password comparison", error: error});
        }
    }
}

module.exports = {
    createAdmin, 
    loginAdmin
}