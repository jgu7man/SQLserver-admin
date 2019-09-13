'use strict';

var mssql = require('mssql');
var app = require('./app');
var port = process.env.PORT || 5000;

var config = {
    user: '',
    password: '',
    server: '',
    port: '',
    database: '',
    encrypt: true
};

var connection = mssql.connect(config, function(err, res) {
    if (err) {
        throw err;
    } else {
        console.log('Conectado correctamente a la base de datos');
        app.listen(port, function() {
            console.log('API-REST running http://localhost:' + port);
        });
    }
});

module.exports = app;