const router = require('express').Router();

const mysql = require('mysql')
const dbconfig   = require('../config/dbconf.js');
const connection = mysql.createConnection(dbconfig);

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const checkUserQuery = "SELECT * FROM user WHERE user_email = ? AND user_password = ?";
    
    connection.query(checkUserQuery, [email, password], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            // 사용자 정보가 일치하는 경우
            res.status(200).send('Login successful');
        } else {
            // 사용자 정보가 일치하지 않는 경우
            res.status(401).send('Incorrect email or password');
        }
    });
});


router.get('/user', (req, res) => {
    connection.query('SELECT * from user', (error, rows) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    });
})

router.get('/facility', function (req, res) {
    connection.query('SELECT * from facility', (error, rows) => {
        if (error) throw error;
        console.log('facility info is: ', rows);
        res.send(rows);
    });
})

router.get('/select/patients', function (req, res) {
    connection.query('SELECT * from patients', (error, rows) => {
        if (error) throw error;
        console.log('patients info is: ', rows);
        res.send(rows);
    });
})

router.get('/select/emergency', function (req, res) {
    connection.query('SELECT * from emergency', (error, rows) => {
        if (error) throw error;
        console.log('emergency info is: ', rows);
        res.send(rows);
    });
})

router.get('/select/medicine', function (req, res) {
    connection.query('SELECT * from medicine', (error, rows) => {
        if (error) throw error;
        console.log('medicine info is: ', rows);
        res.send(rows);
    });
})

router.get('/select/treatment', function (req, res) {
    connection.query('SELECT * from treatment', (error, rows) => {
        if (error) throw error;
        console.log('treatment info is: ', rows);
        res.send(rows);
    });
})

router.get('/select/robot', function (req, res) {
    connection.query('SELECT * from robot', (error, rows) => {
        if (error) throw error;
        console.log('robot info is: ', rows);
        res.send(rows);
    });
})

router.get('/select/robotlog', function (req, res) {
    connection.query('SELECT * from robotlog', (error, rows) => {
        if (error) throw error;
        console.log('robotlog info is: ', rows);
        res.send(rows);
    });
})

router.get('/select/map', function (req, res) {
    connection.query('SELECT * from map', (error, rows) => {
        if (error) throw error;
        console.log('map info is: ', rows);
        res.send(rows);
    });
})

router.get('/select/location', function (req, res) {
    connection.query('SELECT * from location', (error, rows) => {
        if (error) throw error;
        console.log('location info is: ', rows);
        res.send(rows);
    });
})

router.get('/select/itemlocation', function (req, res) {
    connection.query('SELECT * from itemlocation', (error, rows) => {
        if (error) throw error;
        console.log('itemlocation info is: ', rows);
        res.send(rows);
    });
})

module.exports = router;