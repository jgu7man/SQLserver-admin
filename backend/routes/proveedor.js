'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveProveedor', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM Proveedor', function(err, result) {
        if (err) { return next(err); }
        var rec = result.recordset;
        var newId = rec[rec.length - 1].Id + 1;


        // SAVE DATA 
        var campos = 'Id, Proveedor, IdentificadorFiscal, TipoIdentificador, GrupoPersona, Cliente, Pais, PaisOperacion, Segmento, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(`
            INSERT INTO Proveedor (${campos}) 
            VALUES (
                ${newId},
                '${body.Proveedor}',
                '${body.IdentificadorFiscal}',
                ${body.TipoIdentificador},
                '${body.GrupoPersona}',
                '${body.Cliente}',
                '${body.Pais}',
                ${body.PaisOperacion},
                '${body.Segmento}',
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
                )
            `,

            function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(200).send({
                        mensaje: 'Hubo un error al guardar Cliente',
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
            Proveedor = '${body.Proveedor}',
            IdentificadorFiscal = '${body.IdentificadorFiscal}',
            TipoIdentificador = ${body.TipoIdentificador},
            GrupoPersona = '${body.GrupoPersona}',
            Cliente = '${body.Cliente}',
            Pais = '${body.Pais}',
            PaisOperacion = ${body.PaisOperacion},
            Segmento = '${body.Segmento}',
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
                mensaje: 'Proveedor editado con éxito',
                tipo: 'succsess'
            });
        }
    );
});

module.exports = router;