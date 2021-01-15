var dbConn = require('../dbconnection.js');
var express = require('express');
var app = express();

// Retrieve all the stores
app.get('/', function (req, res) {
    
    dbConn.query('SELECT * FROM store', function (error, results, fields) {
        if (error) throw error;
        return res.send({ stores: results, message: 'All the stores' });
    });
});

// Retrieve store using its id 
app.get('/:id', function (req, res) {
    let store_id = req.params.id;
    
    if (!store_id) {
        return res.status(400).send({ error: true, message: 'Please provide a store_id' });
    }
    
    dbConn.query('SELECT * FROM store where id=?', store_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ store: results, message: 'Store with ID: ' + store_id });
    });
});

// Add a new store
app.post('/', function (req, res) {
    let store = {
        id : req.body.id,
        city : req.body.city
    };
   
    if (!store) {
        return res.status(400).send({ error:true, message: 'Please provide a store' });
    }
    
    dbConn.query("INSERT INTO store SET ? ", store, function (error, results, fields) {
        if (error) throw error;
        return res.send({ store: results, message: 'New store has been created successfully.' });
    });
});

//  Update a store with id
app.put('/:id', function (req, res) {
    let store = {
        city : req.body.city, 
    };

    if (!store) {
        return res.status(400).send({ error: store, message: 'Please provide the store description and store_id' });
    }

    dbConn.query("UPDATE store SET ? WHERE id = ?", [store, req.params.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ store: results, message: 'The store has been updated successfully.' });
    });
});
 
//  Delete a store
app.delete('/:id', function (req, res) {
  
    let store_id = req.params.id;
    if (!store_id) {
        return res.status(400).send({ error: true, message: 'Please provide store_id' });
    }
    dbConn.query('DELETE FROM store WHERE id = ?', store_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ store: results, message: 'store ' + store_id + ' has been deleted successfully.' });
    });
}); 

module.exports = app;