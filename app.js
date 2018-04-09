
var path = require('path');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

require('dotenv').config();
process.env.PORT = process.env.PORT || 7070;

var app = express();

app.get('/', function (req, res) {
    res.send('Hello world!!!!');
    // res.sendFile(path.join(__dirname + '/client_dist/index.html'));
});

app.listen(process.env.PORT);