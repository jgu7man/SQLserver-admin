'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveSegmento', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM Segmento', function(err, result) {
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
        var campos = 'Id, Segmento, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(`
        SET IDENTITY_INSERT Segmento ON
            INSERT INTO Segmento (${campos}) 
            VALUES (
                ${newId},
                '${body.Segmento}',
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
                )
                SET IDENTITY_INSERT Segmento OFF
            `,

            function(err, result) {
                if (err) {
                    next(err.originalError.message);
                    return res.status(200).send({
                        mensaje: 'Hubo un error al guardar',
                        tipo: 'warning',
                        error: err
                    });
                }
                var data = {};
                data = result.recordset;
                console.log(data);
                return res.status(200).send({
                    mensaje: 'Segmento agregado con éxito',
                    tipo: 'success'
                });
            });
    });
});

router.post('/updateSegmento', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();


    request.query(
        `
        UPDATE Segmento SET
            Segmento = '${body.Segmento}',
            ModifiedDate = '${date}',
            ModifiedBy = ${body.ModifiedBy}
        WHERE Id = ${body.Id}
        `,

        function(err, result) {
            if (err) {
                next(err.originalError.message);
                // Se puede personalizar el mensaje más no el tipo
                return res.status(200).send({
                    mensaje: 'Hubo un error al guardar',
                    tipo: 'warning'
                });
            }
            var data = {};
            data = result.recordset;
            console.log(data);
            // Se puede personalizar el mensaje más no el tipo
            return res.status(200).send({
                mensaje: 'Segmento editado con éxito',
                tipo: 'success'
            });
        }
    );
});

module.exports = router;