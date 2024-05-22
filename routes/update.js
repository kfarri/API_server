const router = require('express').Router();

const mysql = require('mysql')
const dbconfig   = require('../config/dbconf.js');
const connection = mysql.createConnection(dbconfig);


router.post('/robotname', function (req, res) {
    const {name, serial} = req.body;
    console.log(req.body);
    console.log(name);
    console.log(serial);
    const updateRobotname = "UPDATE robot SET ro_name = ? WHERE ro_serial = ?";

    connection.query(updateRobotname, [name, serial], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            return res.status(500).send('서버와의 연결이 불안정합니다.');
        }

        console.log('Database query results:', results);

        if (results.affectedRows > 0) {
            res.status(200).send('로봇 이름 변경완료');
        } else {
            res.status(404).send('로봇 이름을 찾을 수 없습니다.');
            console.log("Error: No matching robot found.");
        }
    });
})

module.exports = router