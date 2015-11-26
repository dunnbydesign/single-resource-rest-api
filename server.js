'use strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
const app = express()
const dbURI = 'mongodb://localhost/playing'
mongoose.connect(dbURI)

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

app.use((req, res, next) => {
  console.error('***** Error: no such route exists *****')
  var err = new Error('Page Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {title: err.message, error: err})
})

app.listen(3000, () => {
  console.log('Listening on port 3000 ...')
})
