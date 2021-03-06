'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveLineaProducto', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM LineaProducto', function(err, result) {
        if (err) {
            next(err.originalError.message);
            return res.send({
                mensaje: err.originalError.message,
                tipo: 'warning'
            });
        }
        var rec = result.recordset;
        var newId = rec[rec.length - 1].Id + 1;


        // SAVE DATA
        var campos = 'Id, LineaProducto, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(`
        SET IDENTITY_INSERT LineaProducto ON
            INSERT INTO LineaProducto (${campos}) 
            VALUES (
                ${newId},
                '${body.LineaProducto}',
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
                )
                SET IDENTITY_INSERT LineaProducto OFF
            `,

            function(err, result) {
                if (err) {
                    next(err.originalError.message);
                    return res.send({
                        mensaje: err.originalError.message,
                        tipo: 'warning'
                    });
                }
                var data = {};
                data = result.recordset;
                console.log(data);
                return res.status(200).send({
                    mensaje: 'Linea Producto agregado con éxito',
                    tipo: 'success'
                });
            });
    });
});

router.post('/updateLineaProducto', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();


    request.query(
        `
        UPDATE LineaProducto SET
            LineaProducto = '${body.LineaProducto}',
            ModifiedDate = '${date}',
            ModifiedBy = ${body.ModifiedBy}
        WHERE Id = ${body.Id}
        `,

        function(err, result) {
            if (err) {
                next(err.originalError.message);
                return res.send({
                    mensaje: err.originalError.message,
                    tipo: 'warning'
                });
            }
            var data = {};
            data = result.recordset;
            console.log(data);
            // Se puede personalizar el mensaje más no el tipo
            return res.status(200).send({
                mensaje: 'Linea Producto editado con éxito',
                tipo: 'success'
            });
        }
    );
});

module.exports = router;