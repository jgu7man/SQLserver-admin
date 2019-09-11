'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

// GUARDAR USUARIO
router.post('/saveUsuario', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();
    // COMPRUEBA QUE EL USUARIO NO EXISTA
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
                    var newId = rec[rec.length - 1].Id + 1;


                    // SAVE DATA
                    var campos = 'Id, UserName, Password, FirstName, LastName, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
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

                    // SET ROL 

                    var camposRol = 'UserId, RolId, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
                    request.query(`
                    INSERT INTO User_Rol (${camposRol}) 
                    VALUES (
                        ${newId},
                        ${body.RolId},
                        '${date}',
                        '${date}',
                        ${body.CreatedBy},
                        ${body.ModifiedBy}
                        ) `,

                        function(err, result) {
                            if (err) {
                                console.log(err);
                            }
                            var data = {};
                            data = result.recordset;
                        }
                    );

                });
                // RETORNA MENSAJE DE ÉXITO
                return res.status(200).send({
                    mensaje: 'Usuario agregado con éxito',
                    tipo: 'success'
                });

            } else {
                // RETORNA MENSAJE DE NOMBRE DE USUARIO DUPLICADO
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
                console.log(user.Id);
                request.query(`
                SELECT * FROM User_Rol WHERE UserId = ${user.Id}
                `,
                    function(err, result) {
                        if (err) {
                            console.log(err);
                        }
                        var data = {};
                        data = result.recordset[0];
                        console.log(data);
                        var rol = data.RolId;
                        return res.status(200).send({
                            tipo: 'success',
                            mensaje: 'inicio de sesión exitoso',
                            user: {
                                UserId: user.Id,
                                Rol: rol,
                                UserName: user.UserName,
                                FirstName: user.FirstName,
                                LastName: user.LastName
                            }
                        });
                    });
            }
        }
    );
});

router.post('/updateUser_Rol', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    console.log(body);
    request.query(
        `
        UPDATE User_Rol SET
            RolId =  ${body.RolId},
            ModifiedDate = '${date}',
            ModifiedBy = ${body.ModifiedBy}
        WHERE UserId = ${body.UserId}
        `,

        function(err, result) {
            if (err) {
                console.log(err);
                return res.status(200).send({
                    mensaje: 'Error al asignar rol',
                    tipo: 'warning'
                });
            }
            var data = {};
            data = result.recordset;
            return res.status(200).send({
                mensaje: 'Rol asignado con éxito',
                tipo: 'success'
            });
        }
    );
});

router.post('/updateUsuario', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    request.query(
        `
        UPDATE Usuario SET
            UserName = '${body.UserName}',
            Password = '${body.Password}',
            FirstName = '${body.FirstName}',
            LastName = '${body.LastName}',
            ModifiedDate = '${date}',
            ModifiedBy = ${body.ModifiedBy}
        WHERE Id = ${body.Id}
        `,

        function(err, result) {
            if (err) {
                console.log(err);
            }
            var data = {};
            data = result.recordset;
            return res.status(200).send({
                mensaje: 'Usuario editado con éxito',
                tipo: 'success'
            });
        }
    );
});

router.delete('/deleteUsuario/:id?', function(req, res, next) {
    console.log(req.params);
    var tabla = req.params.tabla;
    var id = parseInt(req.params.id);
    console.log(id);
    var request = new sql.Request();
    request.query(`
    DELETE FROM Usuario WHERE Id = ${id}
    DELETE FROM User_Rol WHERE UserId = ${id}
    `, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset;
        return res.status(200).send({
            mensaje: 'Item elimiando con éxito',
            tipo: 'success'
        });
    });
});


module.exports = router;