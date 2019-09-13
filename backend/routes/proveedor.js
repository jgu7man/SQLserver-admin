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


// GET PRIMER PÁGINA DE Proveedor
router.get('/getProveedorTable', async function(req, res, next) {
    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Proveedor.Id, Proveedor.CreatedDate, Proveedor.Proveedor, Proveedor.IdentificadorFiscal, GrupoPersona.GrupoPersona, Pais.Pais, Segmento.Segmento, Usuario.UserName
            FROM ((((Proveedor
            INNER JOIN GrupoPersona ON Proveedor.GrupoPersona = GrupoPersona.Id)
            INNER JOIN Pais ON Proveedor.Pais = Pais.Id)
            INNER JOIN Usuario ON Proveedor.CreatedBy = Usuario.Id)
            INNER JOIN Segmento ON Proveedor.Segmento = Segmento.Id)
            ORDER BY Id OFFSET 0 ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        return res.send({
            data: query1.recordset,
            page: 1
        });

    } catch (err) {
        next(err.originalError.message);
        return res.send({
            mensaje: err.originalError.message,
            tipo: 'warning'
        });
    }
});


// GET NEXT PÁGINA DE PROVEEDOR
router.get('/getProveedorTableNext/:page?', async function(req, res, next) {
    var page = +req.params.page;
    var nextPage = page + 1;
    var ofset = page * 10;

    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Proveedor.Id, Proveedor.CreatedDate, Proveedor.Proveedor, Proveedor.IdentificadorFiscal, GrupoPersona.GrupoPersona, Pais.Pais, Segmento.Segmento, Usuario.UserName
            FROM ((((Proveedor
            INNER JOIN GrupoPersona ON Proveedor.GrupoPersona = GrupoPersona.Id)
            INNER JOIN Pais ON Proveedor.Pais = Pais.Id)
            INNER JOIN Usuario ON Proveedor.CreatedBy = Usuario.Id)
            INNER JOIN Segmento ON Proveedor.Segmento = Segmento.Id)
            ORDER BY Id OFFSET ${ofset} ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        return res.send({
            data: query1.recordset,
            page: nextPage
        });

    } catch (err) {
        next(err.originalError.message);
        return res.send({
            mensaje: err.originalError.message,
            tipo: 'warning'
        });
    }
});


router.get('/getProveedorTablePrevious/:page?', async function(req, res, next) {
    var page = +req.params.page;
    var previusPage = page - 1;
    var ofset = previusPage * 10;
    var previusOfset = ofset - 10;

    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Proveedor.Id, Proveedor.CreatedDate, Proveedor.Proveedor, Proveedor.IdentificadorFiscal, GrupoPersona.GrupoPersona, Pais.Pais, Segmento.Segmento, Usuario.UserName
            FROM ((((Proveedor
            INNER JOIN GrupoPersona ON Proveedor.GrupoPersona = GrupoPersona.Id)
            INNER JOIN Pais ON Proveedor.Pais = Pais.Id)
            INNER JOIN Usuario ON Proveedor.CreatedBy = Usuario.Id)
            INNER JOIN Segmento ON Proveedor.Segmento = Segmento.Id)
            ORDER BY Id OFFSET ${previusOfset} ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        return res.send({
            data: query1.recordset,
            page: previusOfset
        });

    } catch (err) {
        next(err.originalError.message);
        return res.send({
            mensaje: err.originalError.message,
            tipo: 'warning'
        });
    }
});

module.exports = router;