'use strict';

var express = require('express');
var router = express.Router();
var sql = require('mssql');

router.get('/getData/:tabla?', function(req, res, next) {
    var tabla = req.params.tabla;
    var request = new sql.Request();
    request.query(`
    SELECT * FROM ${tabla}
    `, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset;
        res.send(data);
    });
});

router.get('/getTabla/:tabla?', function(req, res, next) {
    var tabla = req.params.tabla;
    var request = new sql.Request();
    request.query(`
    SELECT * FROM ${tabla}
    ORDER BY Id OFFSET 0 ROWS
    FETCH NEXT 10 ROWS ONLY
    `, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset;
        res.send({ data, page: 1 });
    });
});

router.get('/nextPage/:tabla?/:page?', function(req, res, next) {
    var tabla = req.params.tabla;
    var page = +req.params.page;
    var nextPage = page + 1;
    var ofset = page * 10;

    var request = new sql.Request();
    request.query(`
    SELECT * FROM ${tabla}
    ORDER BY Id OFFSET ${ofset} ROWS
    FETCH NEXT 10 ROWS ONLY
    `, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset;
        res.send({ data, page: nextPage });
    });
});

router.get('/previusPage/:tabla?/:page?', function(req, res, next) {
    var tabla = req.params.tabla;
    var page = +req.params.page;
    var previusPage = page - 1;
    var ofset = previusPage * 10;
    var previusOfset = ofset - 10;


    var request = new sql.Request();
    request.query(`
    SELECT * FROM ${tabla}
    ORDER BY Id OFFSET ${previusOfset} ROWS
    FETCH NEXT 10 ROWS ONLY
    `, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset;
        res.send({ data, page: previusPage });
    });
});



router.get('/select/:tabla?/:id?', function(req, res, next) {
    var tabla = req.params.tabla;
    const id = req.params.id;
    var request = new sql.Request();
    request.query(`SELECT * FROM ${tabla} WHERE Id = ${id}`, function(err, result) {
        if (err) {
            return next(err);
        }
        var data = {};
        data = result.recordset[0];
        res.send(data);
    });

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
    console.log(req.params);
    var tabla = req.params.tabla;
    var id = parseInt(req.params.id);
    console.log(id);
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