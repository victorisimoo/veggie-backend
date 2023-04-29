'use strict'

var product = require('../models/Product');
var Inventory = require('../models/Inventory');
var AdministratorController = require('../controllers/AdministratorController');
var fs = require('fs');
var path = require('path');
const { Console } = require('console');

const createProduct = async (req, res) => {
    if(req.user){
        if(req.user.rol == 'admin'){
            console.log(req.user);
            let data = req.body;
            var img_path = req.files.coverPage.path;
            var img_path = img_path.split('\\');
            data.coverPage = img_path[0].split('/').pop();
            data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'');
            let reg = await product.create(data);
            console.log(reg.stock);
            let inventoryProduct = await Inventory.create({
                product: reg._id,
                count: reg.stock,
                admin: req.user.sub,
                supplier: 'N/A'
            });

            res.status(200).send({data : reg, inventory: inventoryProduct});
        }else {
            res.status(403).send({message: 'No tienes permisos para realizar esta acción'});
        }
    }else {
        res.status(403).send({message: 'No tienes permisos para realizar esta acción'});
    }
}

const getAllProducts = async (req, res) => {
    if(req.user){
        if(req.user.rol == 'admin'){
            var filter = req.params['filter'];
            let reg = await product.find({title: new RegExp(filter, 'i')});
            res.status(200).send({data : reg});
        }else {
            res.status(403).send({message: 'No tienes permisos para realizar esta acción'});
        }
    }else {
        res.status(403).send({message: 'No tienes permisos para realizar esta acción'});
    }
}

const get_images = async function(req,res){
    var img = req.params['img'];
    fs.stat('./uploads/products/'+img, function(err){
        if(!err){
            let path_img = './uploads/products/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpeg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })
}

const getProductInfoById = async (req, res) => {
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            try{
                var result = await product.findById({_id: id});
                res.status(200).send({data: result});
            }catch (error){
                res.status(400).send({message: "The product doesn't exists"});
            }
        }else {
            res.status(400).send({message: "You don't have permissions to perform this action"});
        }
    }else {
        return res.status(400).send({message: "You don't have permissions to perform this action"});
    }
}

const updateProduct = async (req, res) => {
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            var data = req.body;
            
            if(req.files){
                try{
                    var img_path = req.files.coverPage.path;
                    var img_path = img_path.split('\\');
                    data.coverPage = img_path[0].split('/').pop();
                    data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'');
                    let reg = await product.findByIdAndUpdate({_id: id},data);

                    fs.stat('./uploads/products/'+reg.coverPage, function(err){
                        if(!err){
                            fs.unlink('./uploads/products/'+reg.coverPage, (err)=>{
                                if(err) throw err;
                            });
                        }
                    })

                    res.status(200).send({data : reg});
                }
                catch (error){
                    res.status(400).send({message: "The product doesn't exists"});
                }
            }else {
                let reg = await product.findByIdAndUpdate({_id: id}, {
                    title: data.title,
                    stock: data.stock,
                    price: data.price,
                    category: data.category,
                    shortdescription: data.shortdescription,
                    extensivedescription: data.extensivedescription
                });
                res.status(200).send({data : reg});
            }
        }else {
            res.status(400).send({message: "You don't have permissions to perform this action"});
        }
    }else {
        return res.status(400).send({message: "You don't have permissions to perform this action"});
    }
}

const deleteProduct = async (req, res) => {
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            try{
                var result = await product.findByIdAndDelete({_id: id});
                res.status(200).send({data: result});
            }catch (error){
                res.status(400).send({message: "The product doesn't exists"});
            }
        }else {
            res.status(400).send({message: "You don't have permissions to perform this action"});
        }
    }else {
        return res.status(400).send({message: "You don't have permissions to perform this action"});
    }
}

const getAllInventory = async (req, res) => {
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            try{
                var result = await Inventory.find({product: id});
                res.status(200).send({data: result});
            }catch (error){
                res.status(400).send({message: "The product doesn't exists"});
            }
        }else {
            res.status(403).send({message: 'You dont have permissions to perform this action'});
        }
    }else {
        res.status(403).send({message: 'You dont have permissions to perform this action'});
    }
}

const deleteInventary = async (req, res) => {
    if(req.user){
        if(req.user.rol == 'admin'){
            var id = req.params['id'];
            try{
                var result = await Inventory.findByIdAndRemove({_id: id});
                res.status(200).send({data: result});
                
            }catch (error){
                res.status(400).send({message: "The inventary doesn't exists"});
            }
        }else {
            res.status(403).send({message: 'You dont have permissions to perform this action'});
        }
    }else {
        res.status(403).send({message: 'You dont have permissions to perform this action'});
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    get_images, 
    getProductInfoById,
    updateProduct,
    deleteProduct, 
    getAllInventory,
    deleteInventary
}