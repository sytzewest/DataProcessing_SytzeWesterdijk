var dbConn = require('../dbconnection.js');
var express = require('express');
var app = express();



// Retrieve product using its id 
app.getAll(type, req, res) {
    
    dbConn.query('SELECT * FROM ' + this.type, function (error, results, fields) {
        if (error) throw error;
        return res.send({products: results, message: 'All the products' });
    });
});

// Retrieve product using its id 
app.get('/:id', function (req, res) {
    let product_id = req.params.id;
    
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide a product_id' });
    }
    
    dbConn.query('SELECT * FROM product where id=?', product_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({product: results, message: 'Product with ID: ' + product_id });
    });
});

// Add a new product
app.post('/', function (req, res) {
    let product = {
        id : req.body.id,
        description : req.body.description, 
        brand : req.body.brand
    };
   
    if (!product) {
        return res.status(400).send({ error:true, message: 'Please provide a product' });
    }
    
    dbConn.query("INSERT INTO product SET ? ", product, function (error, results, fields) {
        if (error) throw error;
        return res.send({product: results, message: 'New product has been created successfully.' });
    });
});

//  Update a product with id
app.put('/:id', function (req, res) {
    let product = {
        description : req.body.description, 
        brand : req.body.brand
    };

    if (!product) {
        return res.status(400).send({ error: product, message: 'Please provide the product description and product_id' });
    }

    dbConn.query("UPDATE product SET ? WHERE id = ?", [product, req.params.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ product: results, message: 'The product has been updated successfully.' });
    });
});
 
//  Delete a product
app.delete('/:id', function (req, res) {
  
    let product_id = req.params.id;
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide product_id' });
    }
    dbConn.query('DELETE FROM product WHERE id = ?', product_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ product: results, message: 'Product ' + product_id + ' has been deleted successfully.' });
    });
}); 

module.exports = app;