
//  Dependencies from NPM
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
//  Declare Express As App So We Can Call It Later
const app = express()
//  Network Variables
const port = 3000
//  Middleware
app.use(express.static(__dirname + '/public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
//  Configure View Engine
app.set('view engine', 'hbs')
//  Routes
app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Music Flex Video Disk Jockeys'
    })
})
//  Start Server
app.listen(port, () => {
    console.log('Server Started On Port 3000')
})
