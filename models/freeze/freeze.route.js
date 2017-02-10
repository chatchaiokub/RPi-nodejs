;(function () {
  'use strict'
  var express = require('express')
  var mongoose = require('mongoose')
  var router = express.Router()
  var Schema = mongoose.Schema
  var thingSchema = new Schema({}, { strict: false })
  var DataFreeze = mongoose.model('freezer', thingSchema)

  router.get('/freezer', function (req, res) {
    DataFreeze.find({})
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
  })

  router.post('/freezer', function (req, res) {
    var Obj = new DataFreeze(req.body)
    Obj.save(function (err, data, affected) {
      if (err) console.log(err)
      else res.send(data)
    })
  })

  router.get('/freezer/:id', function (req, res) {
    DataFreeze.findOne({ _id: req.params.id })
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
  })

  router.put('/freezer/:id', function (req, res) {
    delete req.body._id
    DataFreeze.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true })
      .exec(function (err, done) {
        if (err) console.log(err)
        res.send(done)
      })
  })

  router.delete('/freezer/:id', function (req, res) {
    DataFreeze.findOneAndRemove({ _id: req.params.id })
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
  })

  module.exports = router
})()
