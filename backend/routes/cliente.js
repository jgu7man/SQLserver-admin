'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveCliente', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM Cliente', function(err, result) {
        if (err) { return next(err); }
        var newId;
        var rec = result.recordset;
        if (rec.length == 0) { newId = 1; } else {
            var lastId = rec[rec.length - 1].Id;
            newId = lastId + 1;
        }

        console.log(body);

        // SAVE DATA CLIENTE
        var campos = 'Id, GrupoEmpresarial, RegistroTributario, TipoRegistro, Direccion, WebPage, Actividad, LineaProducto, Vision, Mision, Valores, Pais, Telefono, Industria, TipoIndustria, Segmento, RSE, Marcas, Mercado, PaisFacturacion, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(`
        SET IDENTITY_INSERT Cliente ON
            INSERT INTO Cliente (${campos}) 
            VALUES (
                ${newId},
                '${body.GrupoEmpresarial}',
                '${body.RegistroTributario}',
                ${body.TipoRegistro},
                '${body.Direccion}',
                '${body.WebPage}',
                '${body.Actividad}',
                ${body.LineaProducto},
                '${body.Vision}',
                '${body.Mision}',
                '${body.Valores}',
                ${body.Pais},
                '${body.Telefono}',
                '${body.Industria}',
                ${body.TipoIndustria},
                ${body.Segmento},
                '${body.RSE}',
                '${body.Marcas}',
                '${body.Mercado}',
                ${body.PaisFacturacion},
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
                )
        SET IDENTITY_INSERT Cliente OFF
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
                console.log('Cliente agregado');

            });

        request.query('SELECT * FROM Cliente_LineaProducto', function(err, result) {
            if (err) {
                return next(err);
            }
            var newIdMerge;
            var recMerge = result.recordset;
            if (recMerge.length == 0) { newIdMerge = 1; } else {
                var lastId = recMerge[recMerge.length - 1].Id;
                newIdMerge = lastId + 1;
            }

            console.log(newIdMerge);
            console.log(newId);
            console.log(body.LineaProducto);


            var camposLinea = 'Id, LineaProducto, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, Cliente';
            request.query(`
                INSERT INTO Cliente_LineaProducto (${camposLinea}) 
                VALUES (
                    ${newIdMerge},
                    ${body.LineaProducto},
                    '${date}',
                    '${date}',
                    ${body.CreatedBy},
                    ${body.ModifiedBy},
                    ${newId}
                    )
                `,

                function(err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(200).send({
                            mensaje: 'Hubo un error al guardar LineaProducto',
                            tipo: 'warning',
                            error: err
                        });
                    }
                    var data = {};
                    data = result.recordset;
                    console.log('LineaProducto agregada a Cliente');
                    return res.status(200).send({
                        mensaje: 'Cliente agregado con éxito',
                        tipo: 'succsess'
                    });
                });
        });
    });
});

router.post('/updateCliente', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();


    request.query(
        `
        UPDATE Cliente SET
            GrupoEmpresarial = '${body.GrupoEmpresarial}',
            RegistroTributario = '${body.RegistroTributario}',
            TipoRegistro = ${body.TipoRegistro},
            Direccion = '${body.Direccion}',
            WebPage = '${body.WebPage}',
            Actividad = '${body.Actividad}',
            LineaProducto = ${body.LineaProducto},
            Vision = '${body.Vision}',
            Mision = '${body.Mision}',
            Valores = '${body.Valores}',
            Pais = ${body.Pais},
            Telefono = '${body.Telefono}',
            Industria = '${body.Industria}',
            TipoIndustria = ${body.TipoIndustria},
            Segmento = ${body.Segmento},
            RSE = '${body.RSE}',
            Marcas = '${body.Marcas}',
            Mercado = '${body.Mercado}',
            PaisFacturacion = ${body.PaisFacturacion},
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
            console.log('cliente editado');
            return res.status(200).send({
                mensaje: 'Cliente editada con éxito',
                tipo: 'succsess'
            });
        }
    );
});

module.exports = router;