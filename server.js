// all the requirements
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var js2xmlparser = require("js2xmlparser");

app.use(bodyParser.urlencoded({
    extended: true
}));

// Enable json within bodyParser
app.use(bodyParser.json());

// Enable access for localhost connections through headers - otherwise a cors error occurs
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Main route for when http://localhost:3000 is run, returning message to let the user know the API works
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'API - Data Processing - Sytze Westerdijk - Store Facts' })
});
// connection configurations for the database
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api'
});

// Connect to the database described above
dbConn.connect(); 

// Retrieve all the sales fact, combining the storeIDs which occur multiple times and adding up their profit, returning it in XML
app.get('/:sales_fact/xml', function(req, res) {
    dbConn.query('SELECT storeID, SUM(profit) AS profit FROM sales_fact GROUP BY storeID ASC', function(error, results, fields) {
        if (error) throw error;
        results = js2xmlparser.parse("Data", results);
        return res.send(results);   
    });
}); 

// Retrieve all the sales fact, combining the storeIDs which occur multiple times and adding up their profit, returning it in JSON
app.get('/:sales_fact/json', function(req, res) {
    dbConn.query('SELECT storeID, SUM(profit) AS profit FROM sales_fact GROUP BY storeID ASC', function(error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
}); 
 
// Retrieve prdouct using its id 
app.get('/product/:id', function (req, res) {
    let user_id = req.params.id;
    
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide a product_id' });
    }
    
    dbConn.query('SELECT * FROM product where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Product with ID: ' + user_id });
    });
});

// Retrieve store using its id 
app.get('/store/:id', function (req, res) {
    let user_id = req.params.id;
    
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide a store_id' });
    }
    
    dbConn.query('SELECT * FROM store where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Store with ID: ' + user_id });
    });
});
 
// Add a new product
app.post('/product', function (req, res) {
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
        return res.send({ error: false, data: results, message: 'New product has been created successfully.' });
    });
});

// Add a new store  
app.post('/store', function (req, res) {
    let store = {
        id : req.body.id,
        city : req.body.city, 
    };
   
    if (!product) {
        return res.status(400).send({ error:true, message: 'Please provide a store' });
    }
    
    dbConn.query("INSERT INTO store SET ? ", store, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New store has been created successfully.' });
    });
});

 
 
//  Update a product with id
app.put('/product/:id', function (req, res) {
    let product = {
        description : req.body.description, 
        brand : req.body.brand
    };

    if (!product) {
        return res.status(400).send({ error: product, message: 'Please provide the product description and product_id' });
    }

    dbConn.query("UPDATE product SET ? WHERE id = ?", [product, req.params.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'The product has been updated successfully.' });
    });
});
 
//  Delete a product
app.delete('/product/:id', function (req, res) {
  
    let product_id = req.params.id;
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide product_id' });
    }
    dbConn.query('DELETE FROM product WHERE id = ?', product_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Product ' + product_id + ' has been deleted successfully.' });
    });
}); 
 
// set port the port to 3000, so the link is: http://localhost:3000
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;