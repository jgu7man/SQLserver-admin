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

var tablas = require('./routes/tablas');
var usuarios = require('./routes/usuarios');
var categoria = require('./routes/categoria');
var inconsistencia = require('./routes/inconsistencia');
var proveedor = require('./routes/proveedor');
var cliente = require('./routes/cliente');
var documento = require('./routes/documento');
var grupopersona = require('./routes/grupopersona');
var lineaproducto = require('./routes/lineaproducto');
var pais = require('./routes/pais');
var rol = require('./routes/rol');
var segmento = require('./routes/segmento');
var tipofiscal = require('./routes/tipofiscal');
var tipoindustria = require('./routes/tipoindustria');
var privilegio = require('./routes/privilegio');
var solicitud = require('./routes/solicitud');



app.use('/', tablas);
app.use('/', usuarios);
app.use('/', categoria);
app.use('/', inconsistencia);
app.use('/', proveedor);
app.use('/', cliente);
app.use('/', documento);
app.use('/', grupopersona);
app.use('/', lineaproducto);
app.use('/', pais);
app.use('/', rol);
app.use('/', segmento);
app.use('/', tipofiscal);
app.use('/', tipoindustria);
app.use('/', privilegio);
app.use('/', solicitud);




module.exports = app;