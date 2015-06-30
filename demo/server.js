var http = require('http');
var express = require('express');
var app = express();
app.use('/', express['static'](__dirname));
console.log('Serving: ' + __dirname + ' on port 3000');
app.listen(3000);
