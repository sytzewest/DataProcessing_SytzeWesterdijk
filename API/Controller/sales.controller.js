var dbConn = require('../dbconnection.js');
var express = require('express');
var app = express();

// Retrieve all the sales information 
app.get('/', function (req, res) {
    dbConn.query('SELECT * FROM sales_fact', function (error, results) {
        if (error) throw error;
        return res.send({ sales: results, message: 'All the sales information' });
    });
});

// Retrieve sales_fact using its id 
app.get('/:id', function (req, res) {
    let sales_id = req.params.id;

    if (!sales_id) {
        return res.status(400).send({ error: true, message: 'Please provide a sales_id' });
    }

    dbConn.query('SELECT * FROM sales_fact where id=?', sales_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ sale: results[0], message: 'Sales_fact with ID: ' + sales_id });
    });
});

// Add a new sales_fact
app.post('/', function (req, res) {
    let sales_fact = {
        id: req.body.id,
        sales_factID: req.body.sales_factID,
        productID: req.body.productID,
        sales: req.body.sales,
        cost: req.body.cost,
        profit: req.body.profit
    };

    if (!sales_fact) {
        return res.status(400).send({ error: true, message: 'Please provide all the required information' });
    }

    dbConn.query("INSERT INTO sales_fact SET ? ", sales_fact, function (error, results, fields) {
        if (error) throw error;
        return res.send({ sale: results, message: 'New sale has been created successfully.' });
    });
});

//  Update a sales_fact with id
app.put('/:id', function (req, res) {
    let sales_fact = {
        sales_factID: req.body.sales_factID,
        productID: req.body.productID,
        sales: req.body.sales,
        cost: req.body.cost,
        profit: req.body.profit
    };

    if (!sales_fact) {
        return res.status(400).send({ error: sales_fact, message: 'Please provide all the required information' });
    }

    dbConn.query("UPDATE sales_fact SET ? WHERE id = ?", [sales_fact, req.params.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ sale: results, message: 'The sale has been updated successfully.' });
    });
});

//  Delete a sales_fact
app.delete('/:id', function (req, res) {

    let sales_id = req.params.id;
    if (!sales_id) {
        return res.status(400).send({ error: true, message: 'Please provide sales_id' });
    }
    dbConn.query('DELETE FROM sales_fact WHERE id = ?', sales_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ sale: results, message: 'sales_fact ' + sales_id + ' has been deleted successfully.' });
    });
});

module.exports = app;