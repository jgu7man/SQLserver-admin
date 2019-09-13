'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.get('/getData/:tabla?', async function(req, res, next) {
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    var tabla = req.params.tabla;
    var request = new sql.Request();

    var resultados = [];

    let result1 = await request.query(`SELECT * FROM ${tabla}`);

    var data = result1.recordset;
    await waitFor(1000);

    // var data;
    res.status(200).send(data);
});

// RUTA PARA SOLICITAR TABLAS PAGINADAS
router.get('/getTabla/:tabla?', async function(req, res, next) {
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
        next(err.originalError.message);
        return res.send({
            mensaje: err.originalError.message,
            tipo: 'warning'
        });
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



router.get('/select/:tabla?/:id?', async function(req, res, next) {
    var tabla = req.params.tabla;
    const id = req.params.id;
    var request = new sql.Request();

    try {
        var result = await request.query(`SELECT * FROM ${tabla} WHERE Id = ${id}`);

        var data = result.recordset[0];

        return res.send(data);

    } catch (err) {
        next(err.originalError.message);
        return res.send({
            mensaje: err.originalError.message,
            tipo: 'warning'
        });
    }


});

router.get('/selectArray/:tabla?/:id?', function(req, res, next) {
    var tabla = req.params.tabla;
    const id = req.params.id;
    var request = new sql.Request();
    request.query(`SELECT * FROM ${tabla} WHERE Id = ${id}`, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset;
        res.send(data);
    });

});

router.post('/deleteFK', async function(req, res, next) {
    const body = req.body;
    var request = new sql.Request();
    try {
        await request.query(`
        DELETE FROM ${body.tabla1} WHERE ${body.campo1} = ${body.variable1}
        DELETE FROM ${body.tabla2} WHERE ${body.campo2} = ${body.variable2}
        `).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    } catch (err) {}
});

router.delete('/delete/:tabla?/:id?', function(req, res, next) {
    var tabla = req.params.tabla;
    var id = parseInt(req.params.id);
    var request = new sql.Request();
    request.query(`DELETE FROM ${tabla} WHERE Id = ${id}`, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset;
        return res.status(200).send({
            mensaje: 'Item elimiando con éxito',
            tipo: 'succsess'
        });
    });
});

module.exports = router;