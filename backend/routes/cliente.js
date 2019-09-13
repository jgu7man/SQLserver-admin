'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.post('/saveCliente', async function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();


    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    try {
        // GET LAST INDEX
        let query1 = await request.query('SELECT * FROM Cliente');
        var newId;
        var tablaCliente = query1.recordset;
        if (tablaCliente.length == 0) { newId = 1; } else {
            var lastId = tablaCliente[tablaCliente.length - 1].Id;
            newId = lastId + 1;
        }

        // DEFINE CAMPOS
        var campos = 'Id, GrupoEmpresarial, RegistroTributario, TipoRegistro, Direccion, WebPage, Actividad, LineaProducto, Vision, Mision, Valores, Pais, Telefono, Industria, TipoIndustria, Segmento, RSE, Marcas, Mercado, PaisFacturacion, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy, TipoPago';

        // SAVE DATA CLIENTE
        let query2 = await request.query(`
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
                ${body.ModifiedBy},
                ${body.TipoPago}
                )
        SET IDENTITY_INSERT Cliente OFF
        `);
        console.log('Cliente agregado');


        // GUARDAR SEGÚN TIPO DE PAGO
        // DEFINIR TABLA
        var solicitud;
        if (body.TipoPago == 1) {
            solicitud = 'Solicitud_Credito';
        } else {
            solicitud = 'Solicitud_Efectivo';
        }

        // DEFINE CAMPOS
        var camposSolicitud = 'Cliente, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';

        // SAVE DATA SOLICITUD
        let query3 = await request.query(`
        INSERT INTO ${solicitud} (${camposSolicitud})
        VALUES (${newId}, '${date}', '${date}', ${body.CreatedBy}, ${body.ModifiedBy} )
        `);
        console.log('Cliente agregado a tipo de solicitud');

        return res.send({
            mensaje: 'Cliente agregado con éxito',
            tipo: 'success'
        });

    } catch (err) {
        next(err.originalError.message);
        return res.send({
            mensaje: err.originalError.message,
            tipo: 'warning'
        });
    }

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
            ModifiedBy = ${body.ModifiedBy},
            TipoPago = ${body.TipoPago}
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
            console.log('cliente editado');
            return res.status(200).send({
                mensaje: 'Cliente editada con éxito',
                tipo: 'success'
            });
        }
    );
});

router.post('/enviarEfectivo', async function(req, res, next) {
    const body = req.body;
    const request = new sql.Request();

    console.log(body);

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    var campos = 'Id, Cliente, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';

    try {
        await body.clientes.forEach(async cliente => {
            let result = await request.query(`SELECT * FROM Solicitud_Efectivo`);
            var newId;
            var rec = result.recordset;
            if (rec.length == 0) { newId = 1; } else {
                var lastId = rec[rec.length - 1].Id;
                newId = lastId + 1;
            }
            await request.query(`
                SET IDENTITY_INSERT Solicitud_Efectivo ON
                INSERT INTO Solicitud_Efectivo (${campos})
                VALUES (
                    ${newId},
                    ${cliente},
                    '${date}',
                    '${date}',
                    ${body.CreatedBy},
                    ${body.ModifiedBy}
                )
            `);

        });

        return res.send({
            mensaje: 'Clientes enviados con éxito',
            tipo: 'success'
        });

    } catch (err) {
        next(err.originalError.message);
        return res.send({
            mensaje: err.originalError.message,
            tipo: 'warning'
        });
    }


});


// GUARDAR CÓDIGO SAP
router.post('/saveCodigoSap', async function(req, res, next) {
    const request = new sql.Request();
    const body = req.body;

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    try {
        let query1 = await request.query(`SELECT * FROM CodigoSap`);

        // VALIDACIÓN CLIENTE
        var CodigoSapTable = query1.recordset;
        if (CodigoSapTable.includes(body.Cliente)) {
            return res.send({
                mensaje: 'El cliente ya tiene un código SAP',
                tipo: 'warning'
            });
        } else {


            var newId;
            if (CodigoSapTable.length == 0) { newId = 1; } else {
                var lastId = CodigoSapTable[CodigoSapTable.length - 1].Id;
                newId = lastId + 1;
            }

            var campos = 'Id, ClienteId, CodigoSap, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';

            let query2 = await request.query(`
            INSERT INTO CodigoSap (${campos}) 
                VALUES (
                    ${newId},
                    ${body.ClienteId},
                    '${body.CodigoSAP}',
                    '${date}',
                    '${date}',
                    ${body.CreatedBy},
                    ${body.ModifiedBy}
                )
            `);

            console.log('Código SAP agregado');
            return res.send({
                mensaje: 'Código SAP agregado',
                tipo: 'success'
            });
        }

    } catch (err) {
        next(err.originalError.message);
        return res.send({
            mensaje: err.originalError.message,
            tipo: 'warning'
        });
    }

});

// GUARDAR CONTACTO
router.post('/saveContacto', async function(req, res, next) {
    const request = new sql.Request();
    const body = req.body;

    // GET TODAY
    const today = new Date().toISOString();
    const dateSplit = today.split('T');
    const date = dateSplit[0].toString();

    try {
        let query1 = await request.query(`SELECT * FROM Contacto`);
        var newId;
        var ContactoTable = query1.recordset;
        if (ContactoTable.length == 0) { newId = 1; } else {
            var lastId = ContactoTable[ContactoTable.length - 1].Id;
            newId = lastId + 1;
        }

        var campos = 'Id, Contacto, Posicion, Email, Telefono, Cliente, CreatedDate, ModifiedDate, CreatedBy, ModifiedBy';

        let query2 = await request.query(`
        SET IDENTITY_INSERT Contacto ON
        INSERT INTO Contacto (${campos}) 
            VALUES (
                ${newId},
                '${body.Contacto}',
                '${body.Posicion}',
                '${body.Email}',
                '${body.Telefono}',
                ${body.Cliente},
                '${date}',
                '${date}',
                ${body.CreatedBy},
                ${body.ModifiedBy}
            )
        SET IDENTITY_INSERT Contacto OFF
        `);

        return res.send({
            mensaje: 'Contacto agregado',
            tipo: 'success'
        });

    } catch (err) {
        next(err.originalError.message);
        return res.send({
            mensaje: err.originalError.message,
            tipo: 'warning'
        });
    }

});


// GET PRIMERA PÁGINA DE CLIENTES

router.get('/getClienteTable', async function(req, res, next) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    const request = new sql.Request();
    try {

        let query1 = await request.query(`
            SELECT Cliente.Id, Cliente.CreatedDate, Cliente.GrupoEmpresarial, Pais.Pais, Cliente.Direccion, Cliente.Telefono, Usuario.UserName, Cliente.TipoPago
            FROM ((Cliente
            INNER JOIN Pais ON Cliente.Pais = Pais.Id)
            INNER JOIN Usuario ON Cliente.CreatedBy = Usuario.Id)
            ORDER BY Id OFFSET 0 ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        var clientes = [];
        await query1.recordset.forEach(async cliente => {
            let query2 = await request.query(`
            SELECT Solicitud.Cliente FROM Solicitud WHERE Cliente = ${cliente.Id}
            `);
            if (query2.recordset[0]) {
                return clientes.push({
                    solicitud: true,
                    cliente: cliente
                });
            } else {
                return clientes.push({
                    solicitud: false,
                    cliente: cliente
                });
            }
        });
        await waitFor(1000);
        return res.send({
            data: clientes,
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

// GET SIGUIENTE PÁGINA DE CLIENTES
router.get('/getClienteTableNext/:page?', async function(req, res, next) {
    var page = +req.params.page;
    var nextPage = page + 1;
    var ofset = page * 10;
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Cliente.Id, Cliente.CreatedDate, Cliente.GrupoEmpresarial, Pais.Pais, Cliente.Direccion, Cliente.Telefono, Usuario.UserName, Cliente.TipoPago
            FROM ((Cliente
            INNER JOIN Pais ON Cliente.Pais = Pais.Id)
            INNER JOIN Usuario ON Cliente.CreatedBy = Usuario.Id)
            ORDER BY Id OFFSET ${ofset} ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        var clientes = [];
        await query1.recordset.forEach(async cliente => {
            let query2 = await request.query(`
            SELECT Solicitud.Cliente FROM Solicitud WHERE Cliente = ${cliente.Id}
            `);
            if (query2.recordset[0]) {
                return clientes.push({
                    solicitud: true,
                    cliente: cliente
                });
            } else {
                return clientes.push({
                    solicitud: false,
                    cliente: cliente
                });
            }
        });
        await waitFor(1000);
        return res.send({
            data: clientes,
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

// GET ANTERIOR PÁGINA DE CLIENTES
router.get('/getClienteTablePrevious/:page?', async function(req, res, next) {
    var page = +req.params.page;
    var previusPage = page - 1;
    var ofset = previusPage * 10;
    var previusOfset = ofset - 10;
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    const request = new sql.Request();
    try {
        let query1 = await request.query(`
            SELECT Cliente.Id, Cliente.CreatedDate, Cliente.GrupoEmpresarial, Pais.Pais, Cliente.Direccion, Cliente.Telefono, Usuario.UserName, Cliente.TipoPago
            FROM ((Cliente
            INNER JOIN Pais ON Cliente.Pais = Pais.Id)
            INNER JOIN Usuario ON Cliente.CreatedBy = Usuario.Id)
            ORDER BY Id OFFSET ${previusOfset} ROWS
            FETCH NEXT 10 ROWS ONLY
        `);

        var clientes = [];
        await query1.recordset.forEach(async cliente => {
            let query2 = await request.query(`
            SELECT Solicitud.Cliente FROM Solicitud WHERE Cliente = ${cliente.Id}
            `);
            if (query2.recordset[0]) {
                return clientes.push({
                    solicitud: true,
                    cliente: cliente
                });
            } else {
                return clientes.push({
                    solicitud: false,
                    cliente: cliente
                });
            }
        });
        await waitFor(1000);
        return res.send({
            data: clientes,
            page: previusPage
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