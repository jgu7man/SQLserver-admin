'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/savePrivilegio', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    // GET LAST INDEX
    request.query('SELECT * FROM Privilegio', function(err, result) {
        if (err) { return next(err); }
        var rec = result.recordset;
        var newId;
        if (rec.length == 0) { newId = 1; } else {
            var lastId = rec[rec.length - 1].Id;
            newId = lastId + 1;
        }


        // SAVE DATA
        var campos = 'Id, Privilegio, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';
        request.query(`
        SET IDENTITY_INSERT Privilegio ON
            INSERT INTO Privilegio (${campos}) 
            VALUES (
                ${newId},
                '${body.Privilegio}',
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
                )
        SET IDENTITY_INSERT Privilegio OFF
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
                    mensaje: 'Privilegio agregada con éxito',
                    tipo: 'succsess'
                });
            });
    });
});

router.post('/saveRol_Privilegio', function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    request.query('SELECT * FROM Rol_Privilegio', function(err, result) {
        if (err) { return next(err); }
        var rec = result.recordset;
        var newId;
        if (rec.length == 0) { newId = 1; } else {
            var lastId = rec[rec.length - 1].Id;
            newId = lastId + 1;
        }
        console.log(body);

        // SAVE DATA
        var campos = 'RolId, PrivilegioId, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, Id';
        request.query(`
        SET IDENTITY_INSERT Rol_Privilegio ON
            INSERT INTO Rol_Privilegio (${campos}) 
            VALUES (
                ${body.RolId},
                ${body.PrivilegioId},
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy},
                ${newId}
                )
        SET IDENTITY_INSERT Rol_Privilegio OFF
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
                    mensaje: 'Privilegio agregada con éxito',
                    tipo: 'succsess'
                });
            });
    });
});

router.get('/getRolPrivilegioTabla', async function(req, res, next) {
    const request = new sql.Request();
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

    try {
        // GET TABLA ROLES
        let rolesResult = await request.query('SELECT * FROM Rol');
        var roles = rolesResult.recordset;
        var rol_privilegios = [];

        // GET PRVILEGIOS POR CADA ROL
        await roles.forEach(async rol => {

            var privilegios = [];
            let privs = await request.query(`SELECT * FROM Rol_Privilegio WHERE RolId = ${rol.Id}`);

            console.log(privs.recordset);

            // OBTENER LOS NOMBRE DE PRIVILEGIOS POR CADA ID DE PRIVILEGIO
            await privs.recordset.forEach(async priv => {
                console.log(priv);
                let privilegio = await request.query(`SELECT * FROM Privilegio WHERE Id = ${priv.PrivilegioId}`);
                return privilegios.push({
                    privilegio: privilegio.recordset[0].Privilegio,
                    id: priv.Id
                });
            });
            await waitFor(1000);

            // ENVIA ARRAY DE ROLES CON RESPECTIVOS PRIVILEGIOS
            return rol_privilegios.push({
                RolId: rol.Id,
                Rol: rol.RolDescription,
                Privilegios: privilegios
            });
        });
        await waitFor(1500);

        // ENVÍA ARRAY DE TODOS LOS ROLES Y RESPECTIVOS PRIVILEGIOS
        return res.send(rol_privilegios);
    } catch (err) {
        console.log(err);
    }

});

router.get('/getPrivilegiosByRol/:id?', async function(req, res, next) {
    const RolId = req.params.id;
    const request = new sql.Request();
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

    try {

        // OBTENER PRIVILEGIOS QUE COINCIDAN CON EL ROLID
        var privilegios = [];
        let privs = await request.query(`SELECT * FROM Rol_Privilegio WHERE RolId = ${RolId}`);

        // OBTENER LOS PERMISOS POR ID
        await privs.recordset.forEach(async priv => {
            return privilegios.push(priv.PrivilegioId);
        });
        await waitFor(1000);

        // ENVIA ROL CON RESPECTIVOS PRIVILEGIOS
        return res.send(privilegios);

    } catch (err) {}

});


router.post('/updatePrivilegio', function(req, res, next) {

    const body = req.body;
    const request = new sql.Request();

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();


    request.query(
        `
        UPDATE Privilegio SET
            Privilegio = '${body.Privilegio}',
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
            console.log('Editado');
            // Se puede personalizar el mensaje más no el tipo
            return res.status(200).send({
                mensaje: 'Privilegio editada con éxito',
                tipo: 'succsess'
            });
        }
    );
});

module.exports = router;