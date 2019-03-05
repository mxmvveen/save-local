const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// const sourcesDir = '/sources/';

let currentData;

fs.readFile('db.json', 'utf8', function (error, data) {
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

// app.route('/getUsers').get((req, res) => {
//     fs.readFile('db.json', 'utf8', function (error, data) {
//         const users = Object.keys(JSON.parse(data).users);
//         res.send(users);
//     });
// });

app.route('/logIn').post((req, res) => {
    fs.readFile('db.json', 'utf8', function (error, data) {
        let response;
        const dbData = JSON.parse(data);
        const userNames = Object.keys(dbData.users);
        const user = req.body.user;
        if (userNames.indexOf(user) > -1) {
            response = {
                user: user,
                messages: dbData.users[user].messages
            }
        } else {
            response = {
                user: false
            }
        }
        res.send(response);
    });
});

app.route('/add').post((req, res) => {
    currentData.users[req.body['user']].messages = req.body.messages;
    
    res.status(201).send(true);
    fs.writeFile('db.json', JSON.stringify(currentData), err => {
        if (err) throw err;
    });
});


app.route('/remove').post((req, res) => {
    delete currentData[req.body['key']];

    res.status(201).send(true);
    fs.writeFile('db.json', JSON.stringify(currentData), err => {
        if (err) throw err;
    });
});