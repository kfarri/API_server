const router = require('express').Router();

const mysql = require('mysql')
const dbconfig   = require('../config/dbconf.js');
const connection = mysql.createConnection(dbconfig);

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }
/* Login Query */ 
router.post('/login', (req, res) => {
    const { id, password } = req.body;
    console.log(req.body);
    const checkUserQuery = "SELECT * FROM user WHERE user_email = ? AND user_password = ?";
    console.log(id, password)
    
    connection.query(checkUserQuery, [id, password], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            return res.status(500).send('서버와의 연결이 불안정합니다.');
        }

        console.log(results);

        if (results.length > 0) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('이메일 또는 비밀번호가 틀렸습니다.');
            console.log("err");
        }
    });
});

/* GET Robot List Query */
router.post('/robots', (req, res) => {
    const { username } = req.body;
    console.log(username);
    
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

        const query = 'SELECT * FROM robot WHERE fa_id = ?';

        connection.query(query, [facility_id], (error, results) => {
            if (error) {
                return res.status(500).json({ message: '로봇을 찾는 도중 에러가 났습니다', error });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: '소유한 로봇을 찾을 수 없습니다' });
            }
            res.json(results);
        });
    });
});

router.post('/robotinfo', (req, res) => {
    const {serial} = req.body;

    const getRobotinfo = "SELECT * FROM robot WHERE ro_serial = ?";

    connection.query(getRobotinfo, [serial], (error, results) => {
        if (error) {
            return res.status(500).json({ message: '유저를 찾는 도중 오류가 났습니다', error });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: '유저를 찾을 수 없습니다' });
        }
        console.log(results);
        res.json(results);
    })
});

router.get('/user', (req, res) => {
    connection.query('SELECT * FROM user', (error, rows) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    });
})

router.get('/facility', (req, res) => {
    // sleep(5000);
    connection.query('SELECT * FROM facility', (error, rows) => {
        if (error) throw error;
        console.log('facility info is: ', rows);
        res.send(rows);
    });
})

router.post('/facility-notifications', (req, res) => {
    const { username } = req.body;
    console.log(username);
    
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
        console.log("알림:",facility_id);

        const query = 'SELECT * FROM notification WHERE fa_id = ?';

        connection.query(query, [facility_id], (error, results) => {
            if (error) {
                return res.status(500).json({ message: '알림을 찾는 도중 에러가 났습니다', error });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: '알림을 찾을 수 없습니다' });
            }
            console.log(results);
            res.json(results);
        });
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


/** ----------------------WEB client Access----------------------- */

router.post('/web-login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const checkUserQuery = "SELECT * FROM admin WHERE ad_email = ? AND ad_password = ?";
    console.log(email, password)
    
    connection.query(checkUserQuery, [email, password], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            return res.status(500).send('서버와의 연결이 불안정합니다.');
        }

        console.log(results);

        if (results.length > 0) {
            // 로그인 성공 시 사용자 이메일을 JSON으로 응답
            res.status(200).json({ userEmail: results[0].ad_email, userName: results[0].ad_name });
        } else {
            res.status(401).send('이메일 또는 비밀번호가 틀렸습니다.');
            console.log("err");
        }
    });
});


module.exports = router;