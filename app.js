
var path = require('path');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

require('dotenv').config();
process.env.PORT = process.env.PORT || 7070;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    // res.send('Hello world!!!!');
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/test_get', function(req, res) {
    res.send('Hello! test_get...');
})

app.listen(process.env.PORT);