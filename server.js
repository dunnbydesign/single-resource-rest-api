'use strict'

const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const Account = require('./models/account')
const routes = require('./routes/index')
const games = require('./routes/games')
const app = express()
const dbURI = 'mongodb://localhost/playing'
mongoose.connect(dbURI)

passport.use(new LocalStrategy(Account.authenticate()))
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: 'super secret phrase',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

let ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  let err = new Error('Unauthorized')
  err.status = 401
  next(err)
}

app.use('/', routes)
app.use('/games', ensureAuthenticated, games)

app.use((req, res, next) => {
  let err = new Error('Page Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', { title: err.message, error: err })
})

app.listen(3000, () => {
  console.log('Listening on port 3000 ...')
})
