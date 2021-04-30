const express = require('express')
const SongRoutes = express.Router()
const SongController = require('../controllers/SongController')
const adminAuth = require('../middleware/adminAuth')

// Create song
SongRoutes.post('/songs', SongController.create) // Needs adminAuth

module.exports = SongRoutes