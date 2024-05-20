const router = require('express').Router();

const mysql = require('mysql')
const dbconfig   = require('../config/dbconf.js');
const connection = mysql.createConnection(dbconfig);




module.exports = router;