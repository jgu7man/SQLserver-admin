'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveCategoria', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM Categoria', function(err, result) {
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
        var campos = 'Id, Categoria, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(`
        SET IDENTITY_INSERT Categoria ON
            INSERT INTO Categoria (${campos}) 
            VALUES (
                ${newId},
                '${body.Categoria}',
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
                )
        SET IDENTITY_INSERT Categoria OFF
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
                    mensaje: 'Categoria agregada con éxito',
                    tipo: 'success'
                });
            });
    });
});

router.post('/updateCategoria', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();


    request.query(
        `
        UPDATE Categoria SET
            Categoria = '${body.Categoria}',
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
            console.log('Editado');
            // Se puede personalizar el mensaje más no el tipo
            return res.status(200).send({
                mensaje: 'Categoria editada con éxito',
                tipo: 'success'
            });
        }
    );
});

module.exports = router;