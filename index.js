const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())


app.get('/', function (req, res) {
    res.send('Hello World')
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

app.get('/user', function (req, res) {


  res.send('editting')
})

app.listen(80)