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
        var campos = 'Id, FechaRegistro, FechaRecepcion, Cliente, HojaRuta, Proveedor, Documento, NumeroDocumento, Categoria, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';


        request.query(`
        SET IDENTITY_INSERT Inconsistencia ON
            INSERT INTO Inconsistencia (${campos}) 
            VALUES (
                ${newId}, 
                '${date}', 
                '${body.FechaRecepcion}', 
                ${body.Cliente}, 
                '${body.HojaRuta}', 
                '${body.Proveedor}', 
                '${body.Documento}', 
                '${body.NumeroDocumento}', 
                '${body.Categoria}', 
                '${date}', 
                '${date}', 
                ${body.CreatedBy}, 
                ${body.ModifiedBy}
                )
        SET IDENTITY_INSERT Inconsistencia OFF
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
                return res.status(200).send({
                    mensaje: 'Inconsistencia guardada con éxito',
                    tipo: 'success',
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
                mensaje: 'Inconsistencia editada con éxito',
                tipo: 'success'
            });
        }
    );
});

// GET PRIMER PÁGINA DE Inconsistencia
router.get('/getInconsistenciaTable', async function(req, res, next) {
    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Inconsistencia.Id, Inconsistencia.FechaRegistro, Cliente.GrupoEmpresarial, Inconsistencia.HojaRuta, Proveedor.Proveedor, Documento.Documento, Inconsistencia.NumeroDocumento, Categoria.Categoria
            FROM ((((Inconsistencia
            INNER JOIN Cliente ON Inconsistencia.Cliente = Cliente.Id)
            INNER JOIN Proveedor ON Inconsistencia.Proveedor = Proveedor.Id)
            INNER JOIN Categoria ON Inconsistencia.Categoria = Categoria.Id)
            INNER JOIN Documento ON Inconsistencia.Documento = Documento.Id)
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


// GET NEXT PÁGINA DE InconsistenciaS
router.get('/getInconsistenciaTableNext/:page?', async function(req, res, next) {
    var page = +req.params.page;
    var nextPage = page + 1;
    var ofset = page * 10;

    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Inconsistencia.Id, Inconsistencia.FechaRegistro, Cliente.GrupoEmpresarial, Inconsistencia.HojaRuta, Proveedor.Proveedor, Documento.Documento, Inconsistencia.NumeroDocumento, Categoria.Categoria
            FROM ((((Inconsistencia
            INNER JOIN Cliente ON Inconsistencia.Cliente = Cliente.Id)
            INNER JOIN Proveedor ON Inconsistencia.Proveedor = Proveedor.Id)
            INNER JOIN Categoria ON Inconsistencia.Categoria = Categoria.Id)
            INNER JOIN Documento ON Inconsistencia.Documento = Documento.Id)
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


router.get('/getInconsistenciaTablePrevious/:page?', async function(req, res, next) {
    var page = +req.params.page;
    var previusPage = page - 1;
    var ofset = previusPage * 10;
    var previusOfset = ofset - 10;

    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Inconsistencia.Id, Inconsistencia.FechaRegistro, Cliente.GrupoEmpresarial, Inconsistencia.HojaRuta, Proveedor.Proveedor, Documento.Documento, Inconsistencia.NumeroDocumento, Categoria.Categoria
            FROM ((((Inconsistencia
            INNER JOIN Cliente ON Inconsistencia.Cliente = Cliente.Id)
            INNER JOIN Proveedor ON Inconsistencia.Proveedor = Proveedor.Id)
            INNER JOIN Categoria ON Inconsistencia.Categoria = Categoria.Id)
            INNER JOIN Documento ON Inconsistencia.Documento = Documento.Id)
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