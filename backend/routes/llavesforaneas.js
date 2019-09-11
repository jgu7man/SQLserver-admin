'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');


router.post('/getForanea', function(req, res, next) {
    var body = req.body;
    var request = new sql.Request();
    request.query(`
    SELECT tb1.${body.campo1},
            tb2.${body.campo2} as ${body.campo1}
    FROM ${body.tabla1} tb1, ${body.tabla2} tb2
    WHERE '${body.campo1}' = '${body.campo2}'
    `,
        function(err, result) {
            if (err) {
                return next(err);
            }
            var data = {};
            data = result.recordset;
            res.send(data);
        });
});

module.exports = router;