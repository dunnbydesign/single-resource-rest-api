'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  sport: { type: String, required: '{PATH} is required' },
  homeTeam: { type: String, required: '{PATH} is required' },
  awayTeam: { type: String, required: '{PATH} is required' },
  homeScore: { type: Number, min: [0, '{PATH} cannot be negative'], required: '{PATH} is required' },
  awayScore: { type: Number, min: [0, '{PATH} cannot be negative'], required: '{PATH} is required' },
  date: { type: Date, required: '{PATH} is required' },
  played: Boolean
})

const Game = mongoose.model('Game', gameSchema)

Game.schema.path('homeTeam').validate(value => {
  return /^\D+$/.test(value)
}, '{VALUE} is not a valid homeTeam')

Game.schema.path('awayTeam').validate(value => {
  return /^\D+$/.test(value)
}, '{VALUE} is not a valid awayTeam')

Game.schema.path('homeScore').validate(value => {
  return /^\d+$/.test(value)
}, '{VALUE} is not a valid homeScore')

Game.schema.path('awayScore').validate(value => {
  return /^\d+$/.test(value)
}, '{VALUE} is not a valid awayScore')

module.exports = Game
