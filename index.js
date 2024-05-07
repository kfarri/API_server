const express = require('express')
var cors = require('cors')
const app = express()
const port = 80
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

app.use(cors())

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
    res.send('유저')
})

app.get('/facility', function (req, res) {
    res.send('시설')
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