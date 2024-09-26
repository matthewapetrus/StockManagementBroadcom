// server.js
// Author: Matthew Petrus
// This file sets up an Express server to manage stock data with a RESTful API.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const dataFilePath = path.join(__dirname, 'data.json');
let stocks = require(dataFilePath); // Load initial stocks from JSON

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, '../client'))); // Serve static files from the client directory

// Endpoint to get all stocks
app.get('/api/stocks', (req, res) => {
    res.json(stocks);
});

// Endpoint to get a specific stock by symbol
app.get('/api/stocks/:symbol', (req, res) => {
    const stock = stocks.find(stock => stock.symbol === req.params.symbol);
    if (stock) {
        res.json(stock);
    } else {
        res.status(404).send('Stock not found'); // Return 404 if stock not found
    }
});

// Catch-all route to serve index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Endpoint to delete a stock by symbol
app.delete('/api/stocks/:symbol', (req, res) => {
    const { symbol } = req.params;
    const index = stocks.findIndex(stock => stock.symbol === symbol);
    if (index !== -1) {
        stocks.splice(index, 1); // Remove stock from the in-memory array

        // Persist changes to JSON file
        fs.writeFile(dataFilePath, JSON.stringify(stocks, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving data'); // Handle error while saving
            }
            res.status(204).send(); // No content response
        });
    } else {
        res.status(404).send('Stock not found'); // Return 404 if stock not found
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
