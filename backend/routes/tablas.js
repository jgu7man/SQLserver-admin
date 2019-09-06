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

router.get('/select/:tabla?/:id?', function(req, res, next) {
    var tabla = req.params.tabla;
    const id = req.params.id;
    var request = new sql.Request();
    request.query(`SELECT * FROM ${tabla} WHERE Id = ${id}`, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset[0];
        res.send(data);
    });

});

router.delete('/delete/:tabla?/:id?', function(req, res, next) {
    console.log(req.params);
    var tabla = req.params.tabla;
    var id = parseInt(req.params.id);
    console.log(id);
    var request = new sql.Request();
    request.query(`DELETE FROM ${tabla} WHERE Id = ${id}`, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset;
        return res.status(200).send({
            mensaje: 'Item elimiando con éxito',
            tipo: 'succsess'
        });
    });
});

module.exports = router;