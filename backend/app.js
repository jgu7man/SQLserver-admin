'use strict';

var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

var mssql = require('mssql');

var http = require('http');
var path = require('path');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept', 'application/json', 'text/json');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

var usuarios = require('./routes/usuarios');
var tablas = require('./routes/tablas');

app.use('/', tablas);
app.use('/', usuarios);



module.exports = app;