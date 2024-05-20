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
        console.log('User info is: ', rows);
        res.send(rows);
    });
})

module.exports = router;