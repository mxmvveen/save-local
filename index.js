const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const sourcesDir = '/sources/';

let currentData;

fs.readFile('data.json', 'utf8', function (error, data) {
    currentData = JSON.parse(data);
});

app.listen(8000, () => {
    console.log('Server started!');
});

app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    // Pass to next layer of middleware
    next();
});

app.route('/').get((req, res) => {
    fs.readFile('data.json', 'utf8', function (error, data) {
        currentData = JSON.parse(data);
        res.send(data);
    });
});

app.route('/add').post((req, res) => {
    currentData[req.body['key']] = req.body;

    res.status(201).send(true);
    fs.writeFile('data.json', JSON.stringify(currentData), err => {
        if (err) throw err;
    });
});


app.route('/remove').post((req, res) => {
    delete currentData[req.body['key']];

    res.status(201).send(true);
    fs.writeFile('data.json', JSON.stringify(currentData), err => {
        if (err) throw err;
    });
});