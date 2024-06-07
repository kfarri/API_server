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

router.post('/addRobot', function (req, res){
    const { serial, username } = req.body;
    console.log("user : ",username);
    
    if (!username) {
        return res.status(400).json({ message: '유저가 없습니다' });
    }
    const getfa_id_query = 'SELECT fa_id FROM user WHERE user_email = ?';

    connection.query(getfa_id_query, [username], (error, results) => {
        if (error) {
            return res.status(500).json({ message: '유저를 찾는 도중 오류가 났습니다', error });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: '유저를 찾을 수 없습니다' });
        }

        const facility_id = results[0].fa_id;
        console.log(facility_id);

        const Update_query = 'UPDATE robot SET fa_id = ? WHERE ro_serial = ?';

        connection.query(Update_query, [facility_id, serial], (error, results) => {
            if (error) {
                return res.status(500).json({ message: '로봇 정보를 업데이트 중 문제가 생겼습니다', error });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: '등록된 로봇이 아닙니다' });
            }
            res.status(201);
        });
    });
})

module.exports = router