'use strict'

// modules
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var customer_routes = require('./routes/customer');
var administrator_routes = require('./routes/Administrator');
var product_routes = require('./routes/product');

mongoose.connect('mongodb+srv://victorisimoo:rQxGCng2poTDBAwP@veggie-db.2h6yjgv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    app.listen(port, function() {
        console.log("Servidor del api rest escuchando en http://localhost:" + port);
    });
})
.catch(error => {
  console.error('Error al conectar a la base de datos:', error);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

// routes
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*'); 
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use('/api', customer_routes);
app.use('/api', administrator_routes);
app.use('/api', product_routes);

module.exports = app;





