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
        SET IDENTITY_INSERT Proveedor ON
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
                SET IDENTITY_INSERT Proveedor OFF
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
                console.log('Proveedor agregado');
                return res.status(200).send({
                    mensaje: 'Se guardó el proveedor',
                    tipo: 'success',
                    error: err
                });

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

router.get('/getTablaProveedor', async function(req, res, next) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    var tabla = req.params.tabla;
    var request = new sql.Request();
    try {
        let result1 = await request.query(` 
            SELECT * FROM ${tabla}
            ORDER BY Id OFFSET 0 ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        // CAMBIAR ID'S POR NOMBRES
        var data = [];
        await result1.recordset.forEach(async record => {
            // CAMBIAR CREATED BY
            let createdBy = await request.query(`SELECT * FROM Usuario WHERE Id = ${record.CreatedBy}`);
            record.CreatedBy = createdBy.recordset[0].UserName;

            // CAMBIAR MODIFIEDBY
            let ModifiedBy = await request.query(`SELECT * FROM Usuario WHERE Id = ${record.ModifiedBy}`);
            record.ModifiedBy = ModifiedBy.recordset[0].UserName;

            // INSERTAR DATA DE NUEVO AL ARRAY ORIGINAL
            return data.push(record);
        });
        await waitFor(1000);
        res.send({ data, page: 1 });
    } catch (err) {
        console.log(err);
    }
});

router.get('/nextPage/:tabla?/:page?', async function(req, res, next) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    var request = new sql.Request();
    var tabla = req.params.tabla;
    var page = +req.params.page;
    var nextPage = page + 1;
    var ofset = page * 10;

    try {
        let result1 = await request.query(` 
            SELECT * FROM ${tabla}
            ORDER BY Id OFFSET ${ofset} ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        // CAMBIAR ID'S POR NOMBRES
        var data = [];
        await result1.recordset.forEach(async record => {
            // CAMBIAR CREATED BY
            let createdBy = await request.query(`SELECT * FROM Usuario WHERE Id = ${record.CreatedBy}`);
            record.CreatedBy = createdBy.recordset[0].UserName;

            // CAMBIAR MODIFIEDBY
            let ModifiedBy = await request.query(`SELECT * FROM Usuario WHERE Id = ${record.ModifiedBy}`);
            record.ModifiedBy = ModifiedBy.recordset[0].UserName;

            // INSERTAR DATA DE NUEVO AL ARRAY ORIGINAL
            return data.push(record);
        });
        await waitFor(1000);
        res.send({ data, page: nextPage });
    } catch (err) {
        console.log(err);
    }
});

router.get('/previusPage/:tabla?/:page?', async function(req, res, next) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    var request = new sql.Request();
    var tabla = req.params.tabla;
    var page = +req.params.page;
    var previusPage = page - 1;
    var ofset = previusPage * 10;
    var previusOfset = ofset - 10;


    try {
        let result1 = await request.query(` 
            SELECT * FROM ${tabla}
            ORDER BY Id OFFSET ${previusOfset} ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        // CAMBIAR ID'S POR NOMBRES
        var data = [];
        await result1.recordset.forEach(async record => {
            // CAMBIAR CREATED BY
            let createdBy = await request.query(`SELECT * FROM Usuario WHERE Id = ${record.CreatedBy}`);
            record.CreatedBy = createdBy.recordset[0].UserName;

            // CAMBIAR MODIFIEDBY
            let ModifiedBy = await request.query(`SELECT * FROM Usuario WHERE Id = ${record.ModifiedBy}`);
            record.ModifiedBy = ModifiedBy.recordset[0].UserName;

            // INSERTAR DATA DE NUEVO AL ARRAY ORIGINAL
            return data.push(record);
        });
        await waitFor(1000);
        res.send({ data, page: previusPage });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;