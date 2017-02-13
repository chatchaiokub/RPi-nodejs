;(function () {
  'use strict'
  var express = require('express')
  var mongoose = require('mongoose')
  var router = express.Router()
  var Schema = mongoose.Schema
  var thingSchema = new Schema({}, { strict: false })
  var DataFidge = mongoose.model('fridge', thingSchema)

  router.get('/api', function (req, res) {
    DataFidge.find({})
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
  })

  router.post('/api', function (req, res) {
    var Obj = new DataFidge(req.body)
    Obj.save(function (err, data, affected) {
      if (err) console.log(err)
      else res.send(data)
    })
  })

  router.get('/api/:id', function (req, res) {
    DataFidge.findOne({ _id: req.params.id })
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
  })

  router.put('/api/:id', function (req, res) {
    delete req.body._id
    DataFidge.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true })
      .exec(function (err, done) {
        if (err) console.log(err)
        res.send(done)
      })
  })

  router.delete('/api/:id', function (req, res) {
    DataFidge.findOneAndRemove({ _id: req.params.id })
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
  })

  module.exports = router
})()
