var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var snap = require('./models/snap/snap.route.js')
var db = require('./models/db/db.route.js')
var freeze = require('./models/freeze/freeze.route.js')
var app = express()

mongoose.connect('mongodb://fridge:fridge@ds133348.mlab.com:33348/smart-fridge')
// mongoose.connect('mongodb://localhost/smart-fridge')

app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/', snap)
app.use('/', db)
app.use('/', freeze)

app.listen(3000)
console.log('running on port 3000.')
