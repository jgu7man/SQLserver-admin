'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveSolicitud', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM Solicitud', function(err, result) {
        var rec = result.recordset;
        var newId;
        if (rec.length == 0) { newId = 1; } else {
            var lastId = rec[rec.length - 1].Id;
            newId = lastId + 1;
        }

        console.log(body);
        console.log(date);
        console.log(newId);

        // SAVE DATA
        var campos = 'Id, Cliente, TramitesMensualesEsperados, ProyeccionCM1Mensual, ProyeccionVolumenMensual, MontoSolicitado, TiempoCredito, Moneda, Division, TipoPago, FinanciamientoImpuestos, TiempoCreditoImpuesto, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(`
        SET IDENTITY_INSERT Solicitud ON
            INSERT INTO Solicitud (${campos}) 
            VALUES (
                ${newId},
                ${body.Cliente},
                '${body.TramitesMensualesEsperados}',
                '${body.ProyeccionCM1Mensual}',
                '${body.ProyeccionVolumenMensual}',
                ${body.MontoSolicitado},
                ${body.TiempoCredito},
                ${body.Moneda},
                '${body.Division}',
                ${body.TipoPago},
                '${body.FinanciamientoImpuestos}',
                ${body.TiempoCreditoImpuesto},
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
                )
                SET IDENTITY_INSERT Solicitud OFF
            `,

            function(err, result) {
                if (err) {
                    console.log(err);
                    return res.status(200).send({
                        mensaje: 'Hubo un error al guardar',
                        tipo: 'warning',
                        error: err
                    });
                }
                var data = {};
                data = result.recordset;
                console.log(data);




                var camposCredito = 'Id, Cliente, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
                request.query('SELECT * FROM Solicitud_Credito', function(err, result) {
                    var rec = result.recordset;
                    var newId;
                    if (rec.length == 0) { newId = 1; } else {
                        var lastId = rec[rec.length - 1].Id;
                        newId = lastId + 1;
                    }

                    console.log(newId, body.Cliente, date);

                    request.query(`
        SET IDENTITY_INSERT Solicitud_Credito ON
            INSERT INTO Solicitud_Credito (${camposCredito}) 
            VALUES (
                ${newId},
                ${body.Cliente},
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
            )
        SET IDENTITY_INSERT Solicitud_Credito OFF
            `,
                        function(err, result) {
                            if (err) {
                                console.log(err);
                                return res.status(200).send({
                                    mensaje: 'Hubo un error al guardar',
                                    tipo: 'warning',
                                    error: err
                                });
                            }
                        });
                });


                return res.status(200).send({
                    mensaje: 'Solicitud agregado con éxito',
                    tipo: 'success'
                });
            });
    });
});


router.get('/getTablaSolicitud/:tabla?', async function(req, res, next) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    var tabla = req.params.tabla;
    var request = new sql.Request();
    try {
        let result1 = await request.query(` 
            SELECT * FROM ${tabla}
            ORDER BY Id OFFSET 0 ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        // CAMBIAR ID'S POR CLIENTES
        var data = [];
        console.log(result1.recordset);
        await result1.recordset.forEach(async record => {
            // CAMBIAR CREATED BY
            let cliente = await request.query(`SELECT * FROM Cliente WHERE Id = ${record.Cliente}`);

            // INSERTAR DATA DE NUEVO AL ARRAY ORIGINAL
            return data.push(cliente.recordset[0]);
        });
        await waitFor(1000);
        res.send({ data, page: 1 });
    } catch (err) {
        console.log(err);
    }
});

router.get('/nextPageSolicitud/:tabla?/:page?', async function(req, res, next) {
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
            let cliente = await request.query(`SELECT * FROM Cliente WHERE Id = ${record.Cliente}`);

            return data.push(cliente);
        });
        await waitFor(1000);
        res.send({ data, page: nextPage });
    } catch (err) {
        console.log(err);
    }
});

router.get('/previusPageSolicitud/:tabla?/:page?', async function(req, res, next) {
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
            let cliente = await request.query(`SELECT * FROM Cliente WHERE Id = ${record.Cliente}`);


            // INSERTAR DATA DE NUEVO AL ARRAY ORIGINAL
            return data.push(cliente);
        });
        await waitFor(1000);
        res.send({ data, page: previusPage });
    } catch (err) {
        console.log(err);
    }
});














// router.post('/updateSolicitud', function(req, res, next) {

//     const body = req.body;
//     const request = new sql.Request();

//     // GET TODAY
//     const today = new Date().toISOString();
//     const dateSplit = today.split('T');
//     const date = dateSplit[0].toString();


//     request.query(
//         `
//         UPDATE Solicitud SET
//             Solicitud = '${body.Solicitud}',
//             ModifiedDate = '${date}',
//             ModifiedBy = ${body.ModifiedBy}
//         WHERE Id = ${body.Id}
//         `,

//         function(err, result) {
//             if (err) {
//                 console.log(err);
//                 // Se puede personalizar el mensaje más no el tipo
//                 return res.status(200).send({
//                     mensaje: 'Hubo un error al guardar',
//                     tipo: 'warning'
//                 });
//             }
//             var data = {};
//             data = result.recordset;
//             console.log(data);
//             // Se puede personalizar el mensaje más no el tipo
//             return res.status(200).send({
//                 mensaje: 'Solicitud editado con éxito',
//                 tipo: 'succsess'
//             });
//         }
//     );
// });

module.exports = router;