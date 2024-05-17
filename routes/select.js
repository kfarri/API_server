const router = require('express').Router();

const mysql = require('mysql')
const dbconfig   = require('../config/dbconf.js');
const connection = mysql.createConnection(dbconfig);

router.get('/user', (req, res) => {
    connection.query('SELECT * from user', (error, rows) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    });
})

module.exports = router;