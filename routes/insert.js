const router = require('express').Router();

const mysql = require('mysql')
const dbconfig   = require('../config/dbconf.js');
const connection = mysql.createConnection(dbconfig);

router.post('/signup', (req, res) => {
    const { email, password, name, phone, token, facility } = req.body;
    const checkEmailQuery = "SELECT * FROM user WHERE user_email = ?";
    const insertUserQuery = "INSERT INTO user (user_email, user_password, user_name, user_phone, user_token, fa_id) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(checkEmailQuery, [email], (checkError, checkResults) => {
        if (checkError) {
            console.error('Error checking email:', checkError);
            return res.status(500).send('Internal Server Error');
        }

        if (checkResults.length > 0) {
            return res.status(409).send('Email already exists');
        } else {
            connection.query(insertUserQuery, [email, password, name, phone, token, facility], (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error inserting data into database:', insertError);
                    return res.status(500).send('Internal Server Error');
                }
                console.log('User info is: ', insertResult);
                res.status(201).send('User registered successfully');
            });
        }
    });
});

/** ----------------------WEB client Access----------------------- */

router.post('/web-signup', (req, res) => {
    const { email, password, name, phone, token, facility } = req.body;
    const checkEmailQuery = "SELECT * FROM admin WHERE ad_email = ?";
    const insertUserQuery = "INSERT INTO admin (ad_name, ad_email, ad_password, user_phone) VALUES (?, ?, ?, ?)";

    connection.query(checkEmailQuery, [email], (checkError, checkResults) => {
        if (checkError) {
            console.error('Error checking email:', checkError);
            return res.status(500).send('Internal Server Error');
        }

        if (checkResults.length > 0) {
            return res.status(409).send('Email already exists');
        } else {
            connection.query(insertUserQuery, [email, password, name, phone, token, facility], (insertError, insertResult) => {
                if (insertError) {
                    console.error('Error inserting data into database:', insertError);
                    return res.status(500).send('Internal Server Error');
                }
                console.log('User info is: ', insertResult);
                res.status(201);
            });
        }
    });
});
module.exports = router;