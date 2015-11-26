'use strict'

const express = require('express')
const passport = require('passport')

const Account = require('../models/account')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'SportsCentre', user: req.user })
})

router.get('/login', (req, res) => {
  if (req.user) res.redirect('/')
  else res.render('login', { title: 'SportsCentre' })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.render('login', { title: 'SportsCentre', message: info.message })
    req.login(user, err => {
      if (err) return next(err)
      return res.redirect('/')
    })
  })(req, res, next)
})

router.get('/register', (req, res) => {
  if (req.user) res.redirect('/')
  else res.render('register', { title: 'SportsCentre' })
})

router.post('/register', (req, res) => {
  Account.register(new Account({ username: req.body.username }), req.body.password, err => {
    if (err) return res.render('register', { title: 'SportsCentre', message: err.message })
    passport.authenticate('local')(req, res, () => {
      res.redirect('/')
    })
  })
})

router.get('/logout', (req, res) => {
  if (req.user) req.logout()
  res.redirect('/')
})

module.exports = router
