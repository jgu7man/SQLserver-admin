'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveInconsistencia', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM Inconsistencia', function(err, result) {
        if (err) { return next(err); }
        var rec = result.recordset;
        var newId = rec[rec.length - 1].Id + 1;


        // SAVE DATA 
        var campos = 'Id, FechaRegistro, FechaRecepcion, Cliente, HojaRuta, Proveedor, Documento, NumeroDocumento, Categoria, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(
            `SET IDENTITY_INSERT Inconsistencia ON
            INSERT INTO Inconsistencia (${campos}) 
            VALUES (
                ${newId},
                '${date}',
                '${body.FechaRecepcion}',
                ${body.Cliente},
                '${body.HojaRuta}',
                '${body.Proveedor}',
                '${body.Documento}',
                ${body.NumeroDocumento},
                '${body.Categoria}',
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
                )
                SET IDENTITY_INSERT Inconsistencia OFF `,

            function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(200).send({
                        mensaje: 'Hubo un error al guardar la inconsistencia',
                        tipo: 'warning',
                        error: err
                    });
                }
                var data = {};
                data = result.recordset;
                console.log(data);

            });
    });
});

router.post('/updateProveedor', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();


    request.query(
        `
        UPDATE Proveedor SET
            FechaRecepcion = '${body.FechaRecepcion}',
            Cliente = ${body.Cliente},
            HojaRuta = '${body.HojaRuta}',
            Proveedor = '${body.Proveedor}',
            Documento = '${body.Documento}',
            NumeroDocumento = ${body.NumeroDocumento},
            Categoria = '${body.Categoria}',
            ModifiedDate = '${date}',
            ModifiedBy = ${body.ModifiedBy}
        WHERE Id = ${body.Id}
        `,

        function(err, result) {
            if (err) {
                console.log(err);
                return res.status(200).send({
                    mensaje: 'Hubo un error al guardar',
                    tipo: 'warning'
                });
            }
            var data = {};
            data = result.recordset;
            console.log(data);
            return res.status(200).send({
                mensaje: 'Inconsistencia editada con éxito',
                tipo: 'succsess'
            });
        }
    );
});

module.exports = router;