const express = require('express')
var cors = require('cors')
const app = express()
const port = 80
const mysql = require('mysql')
const dbconfig   = require('./config/dbconf.js');
const connection = mysql.createConnection(dbconfig);
app.use(cors())

connection.connect();

// 선택, 수정, 삭제 쿼리별 분류해야 함
// ex)
// select/user
// select/userjfacility 조인
// update/patients 
// delete/user

app.get('/', function (req, res) {
    res.send('homepage')
})

app.get('/user', function (req, res) {
    connection.query('SELECT * from user', (error, rows) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    });
})

app.get('/facility', function (req, res) {
    connection.query('SELECT * from facility', (error, rows) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    });
})

app.get('/patients', function (req, res) {
    res.send('환자')
})

app.get('/emergency', function (req, res) {
    res.send('응급상황')
})

app.get('/medicine', function (req, res) {
    res.send('약')
})

app.get('/treatment', function (req, res) {
    res.send('복용')
})

app.get('/robot', function (req, res) {
    res.send('로봇')
})

app.get('/robotlog', function (req, res) {
    res.send('로봇기록')
})

app.get('/map', function (req, res) {
    res.send('지도')
})

app.get('/location', function (req, res) {
    res.send('건물')
})

app.get('/itemlocation', function (req, res) {
    res.send('_')
})


app.get('/sound/:name', function (req, res) {
    const { name } = req.params
    
    if(name == "dog"){
        res.json({'sound' : 'mung'})
    } else if(name == "cat"){
        res.json({'sound' : "nyang"})
    } else if(name == "pig"){
        res.json({'sound' : "ggul"})
    } else {
        res.json({"sound" : "empty"})
    }
    
})
app.listen(80)