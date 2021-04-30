const express = require('express')
const ArtistRoutes = express.Router()
const ArtistController = require('../controllers/ArtistController')
const adminAuth = require('../middleware/adminAuth')

// Create artist
ArtistRoutes.post('/artists', ArtistController.create) // Needs adminAuth

// Get all artists
ArtistRoutes.get('/artists', ArtistController.getAll)

module.exports = ArtistRoutes