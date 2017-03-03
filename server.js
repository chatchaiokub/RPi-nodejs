var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var snap = require('./models/snap/snap.route.js')
var db = require('./models/db/db.route.js')
var freeze = require('./models/freeze/freeze.route.js')
var multer = require('multer')
var app = express()

// mongoose.connect('mongodb://fridge:fridge@ds133348.mlab.com:33348/smart-fridge')
mongoose.connect('mongodb://localhost/smart-fridge')

app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/', snap)
app.use('/', db)
app.use('/', freeze)

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads')
  },
  filename: function (req, file, callback) {
    console.log(file)
    switch (file.mimetype) {
      case 'image/jpeg':
        let time = Date.now()
        callback(null, time + '.jpeg')
        strPathImg = './uploads/' + time + '.jpeg'
        break
      case 'image/png':
        callback(null, Date.now() + '.png')
        break
      case 'image/jpg':
        callback(null, Date.now() + '.jpg')
        break
      case 'image/gif':
        callback(null, Date.now() + '.gif')
        break
    }
  }
})
var upload = multer({
  storage: storage
}).single('userPhoto')

app.post('/api/photo', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end('Error uploading file.')
    }
    res.end('File is uploaded')
  })
})

// //////////////////////////////////////////////
var strPathImg = ''
var Schema = mongoose.Schema
var imgPath = new Schema({}, { strict: false })
var SchemaPath = mongoose.model('imgPath', imgPath)
app.get('/img/path', function (req, res) {
  SchemaPath.find({}).exec((err, done) => {
    if (err) console.log(err)
    if (done) res.send(done)
  })
})

app.post('/img/path', function (req, res) {
  console.log(req.body)
  let setData = {
    things: req.body.things,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    pathImg: strPathImg,
    days: req.body.days,
    ArrDrag: req.body.ArrDrag
  }
  var obj = new SchemaPath(setData)
  obj.save((err, done) => {
    if (err) console.log(err)
    if (done) console.log('success')
  })
  strPathImg = ''
  res.send('success')
})

app.listen(3000)
console.log('running on port 3000.')
