'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveUsuario', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();
    request.query(`SELECT * FROM Usuario WHERE UserName = '${body.UserName}'`,
        function(err, result) {
            if (err) {
                console.log(err);
            }
            var data;
            data = result.recordset[0];
            console.log(data);
            if (!data) {

                // GET TODAY
                const today = new Date().toISOString();
                const dateSplit = today.split('T');
                const date = dateSplit[0].toString();

                // GET LAST INDEX

                request.query('SELECT * FROM Usuario', function(err, result) {
                    if (err) { return next(err); }
                    var rec = result.recordset;
                    var newId = rec[rec.length - 1].UserId + 1;


                    // SAVE DATA
                    var campos = 'UserId, UserName, Password, FirstName, LastName, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
                    request.query(
                        `SET IDENTITY_INSERT Usuario ON
                    INSERT INTO Usuario (${campos}) 
                    VALUES (
                        ${newId},
                        '${body.UserName}',
                        '${body.Password}',
                        '${body.FirstName}',
                        '${body.LastName}',
                        '${date}',
                        '${date}',
                        ${body.CreatedBy},
                        ${body.ModifiedBy}
                        )
                    SET IDENTITY_INSERT Usuario OFF `,

                        function(err, result) {
                            if (err) {
                                console.log(err);
                            }
                            // var data = {};
                            data = result.recordset;
                        });

                });
                return res.status(200).send({
                    mensaje: 'Usuario agregado con éxito',
                    tipo: 'succsess'
                });

            } else {
                return res.status(200).send({
                    mensaje: 'Nombre de usuario repetido, por favor elige otro',
                    tipo: 'warning'
                });
            }
        });
});

router.post('/login', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();
    request.query(`
        SELECT * FROM Usuario WHERE UserName = '${body.UserName}'
    `,
        function(err, result) {
            if (err) { return next(err); }
            var user = result.recordset[0];
            console.log(user);
            if (!user) {
                return res.status(200).send({
                    mensaje: 'Usuario no encontrado',
                    tipo: 'warning'
                });
            } else if (user.Password != body.Password) {
                return res.status(200).send({
                    tipo: 'warning',
                    mensaje: 'Contraseña no válida'
                });
            } else {
                return res.status(200).send({
                    tipo: 'success',
                    mensaje: 'inicio de sesión exitoso',
                    user: {
                        UserId: user.UserId,
                        UserName: user.UserName,
                        FirstName: user.FirstName,
                        LastName: user.LastName
                    }
                });
            }
        }
    );
});

module.exports = router;