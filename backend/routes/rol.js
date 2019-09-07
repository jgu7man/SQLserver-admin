'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveRol', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM Rol', function(err, result) {
        if (err) { return next(err); }
        var rec = result.recordset;
        var newId = rec[rec.length - 1].Id + 1;


        // SAVE DATA
        var campos = 'Id, Rol, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(`
        SET IDENTITY_INSERT Rol ON
            INSERT INTO Rol (${campos}) 
            VALUES (
                ${newId},
                '${body.Rol}',
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
                )
                SET IDENTITY_INSERT Rol OFF
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
                return res.status(200).send({
                    mensaje: 'Rol agregado con éxito',
                    tipo: 'succsess'
                });
            });
    });
});

router.post('/updateRol', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();


    request.query(
        `
        UPDATE Rol SET
             Rol = '${body.Rol}',
            ModifiedDate = '${date}',
            ModifiedBy = ${body.ModifiedBy}
        WHERE Id = ${body.Id}
        `,

        function(err, result) {
            if (err) {
                console.log(err);
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
                mensaje: 'Rol editado con éxito',
                tipo: 'succsess'
            });
        }
    );
});

module.exports = router;