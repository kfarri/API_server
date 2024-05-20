const express = require('express')
var cors = require('cors')
const app = express()
const bodyParser = require('body-parser');

const port = 80
const mysql = require('mysql')
const dbconfig   = require('./config/dbconf.js');
const connection = mysql.createConnection(dbconfig);
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const admin = require('firebase-admin');

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

const select = require('./routes/select');
app.use('/select', select);

const insert = require('./routes/insert');
app.use('/insert', insert);


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