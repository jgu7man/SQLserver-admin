'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.get('/tabla/:tabla?', function(req, res, next) {
    var tabla = req.params.tabla;
    var request = new sql.Request();
    request.query('SELECT * FROM ' + tabla, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset;
        res.send(data);
    });
});

module.exports = router;