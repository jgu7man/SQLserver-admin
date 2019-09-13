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
        function(err, result, next) {
            if (err) {
                next(err.originalError.message);
                return res.send({
                    mensaje: err.originalError.message,
                    tipo: 'warning'
                });
            }
            var data;
            data = result.recordset[0];
            // console.log(data);
            if (!data) {

                // GET TODAY
                const today = new Date().toISOString();
                const dateSplit = today.split('T');
                const date = dateSplit[0].toString();

                // GET LAST INDEX

                request.query('SELECT * FROM Usuario', function(err, result, next) {
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

                        function(err, result, next) {
                            if (err) {
                                next(err.originalError.message);
                                return res.send({
                                    mensaje: err.originalError.message,
                                    tipo: 'warning'
                                });
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

                        function(err, result, next) {
                            if (err) {
                                next(err.originalError.message);
                                return res.send({
                                    mensaje: err.originalError.message,
                                    tipo: 'warning'
                                });
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

// LOGIN

router.post('/login', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();
    request.query(`
        SELECT * FROM Usuario WHERE UserName = '${body.UserName}'
    `,
        function(err, result, next) {
            if (err) {
                next(err.originalError.message);
                return res.send({
                    mensaje: err.originalError.message,
                    tipo: 'warning'
                });
            }
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
                request.query(`
                SELECT * FROM User_Rol WHERE UserId = ${user.Id}
                `,
                    function(err, result, next) {
                        if (err) {
                            next(err.originalError.message);
                            return res.send({
                                mensaje: err.originalError.message,
                                tipo: 'warning'
                            });
                        }
                        var data = {};
                        data = result.recordset[0];
                        // console.log(data);
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

// CHANGE USER_ROL

router.post('/updateUser_Rol', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    request.query(
        `
        UPDATE User_Rol SET
            RolId =  ${body.RolId},
            ModifiedDate = '${date}',
            ModifiedBy = ${body.ModifiedBy}
        WHERE UserId = ${body.UserId}
        `,

        function(err, result, next) {
            if (err) {
                next(err.originalError.message);
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

        function(err, result, next) {
            if (err) {
                next(err.originalError.message);
                return res.status(200).send({
                    mensaje: 'Error al asignar rol',
                    tipo: 'warning'
                });
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


// GET PRIMER PÁGINA DE USUARIOS
router.get('/getUsuarioTable', async function(req, res, next) {
    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Usuario.Id, Usuario.UserName, Usuario.FirstName, Usuario.LastName, Rol.RolDescription
            FROM ((Usuario
            INNER JOIN User_Rol ON Usuario.Id = User_Rol.UserId)
            INNER JOIN Rol ON User_Rol.RolId = Rol.Id)
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


// GET NEXT PÁGINA DE USUARIOS
router.get('/getUsuarioTableNext/:page?', async function(req, res, next) {
    var page = +req.params.page;
    var nextPage = page + 1;
    var ofset = page * 10;

    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Usuario.Id, Usuario.UserName, Usuario.FirstName, Usuario.LastName, Rol.RolDescription
            FROM ((Usuario
            INNER JOIN User_Rol ON Usuario.Id = User_Rol.UserId)
            INNER JOIN Rol ON User_Rol.RolId = Rol.Id)
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


router.get('/getUsuarioTablePrevious/:page?', async function(req, res, next) {
    var page = +req.params.page;
    var previusPage = page - 1;
    var ofset = previusPage * 10;
    var previusOfset = ofset - 10;

    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Usuario.Id, Usuario.UserName, Usuario.FirstName, Usuario.LastName, Rol.RolDescription
            FROM ((Usuario
            INNER JOIN User_Rol ON Usuario.Id = User_Rol.UserId)
            INNER JOIN Rol ON User_Rol.RolId = Rol.Id)
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