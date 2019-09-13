'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveTipoIndustria', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM TipoIndustria', function(err, result) {
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
        var campos = 'Id, TipoIndustria, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(`
        SET IDENTITY_INSERT TipoIndustria ON
            INSERT INTO TipoIndustria (${campos}) 
            VALUES (
                ${newId},
                '${body.TipoIndustria}',
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy},
                )
                SET IDENTITY_INSERT TipoIndustria OFF
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
                console.log('Tipo Industria guardado');
                return res.status(200).send({
                    mensaje: 'Tipo Industria agregado con éxito',
                    tipo: 'success'
                });
            });
    });
});

router.post('/updateTipoIndustria', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();


    request.query(
        `
        UPDATE TipoFiscal SET
            TipoIndustria = '${body.TipoIndustria}',
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
            console.log('Tipo Industria Actualizado');
            // Se puede personalizar el mensaje más no el tipo
            return res.status(200).send({
                mensaje: 'Tipo Industria editado con éxito',
                tipo: 'success'
            });
        }
    );
});

module.exports = router;