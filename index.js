const express = require('express')
var cors = require('cors')
const app = express()
const port = 80
const mysql = require('mysql')
const dbconfig   = require('./config/dbconf.js');
const connection = mysql.createConnection(dbconfig);
app.use(cors())
const admin = require('firebase-admin');

connection.connect();

const select = require('./routes/select');
app.use('/select', select);
const insert = require('./routes/insert');
app.use('/insert', insert);
const remove = require('./routes/remove');
app.use('/remove', remove);



app.get('/user', function (req, res) {
    res.send('사용자')
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

const serviceAccount = require('./config/carebot_Firebase_key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.get('/send-fcm-message', (req, res) => {
    //const { token, title, body } = req.body;
  
    //if (!token || !title || !body) {
    //  return res.status(400).send('Missing parameters');
    //}
  
    const message = {
      notification: {
        title: 'nodeJS',
        body: 'FCM test'
      },
      token: 'd8QJA0d3R5iiJp0Qh4a6Mk:APA91bHtuH2bEpt6HHyaJSv6FdM4qvr-a-dN9NBztcUya6qtw6DI6XYU2Lu_QMDNCVPf0GGQAusZx35KOhta8w3QuE3ZysF7g_ZrUhmqwSu0Nbz_0cOi8DuQ446G8s4zYVcNqToxHfzn'
    };
  
    admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
        res.status(200).send('Message sent successfully');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending message');
      });
  });

app.get('/notification/:token', function (req, res) {
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