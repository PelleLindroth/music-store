const express = require('express')
const AlbumRoutes = express.Router()
const AlbumController = require('../controllers/AlbumController')
const adminAuth = require('../middleware/adminAuth')

// Create new album
AlbumRoutes.post('/albums/create', AlbumController.create) // needs adminAuth

// Get album by id
// AlbumRoutes.get('/albums/:id', AlbumController.getById)

// Get albums by artist
// AlbumRoutes.get('/albums/:artist_id', AlbumController.getByArtist)

// Get all albums
AlbumRoutes.get('/albums', AlbumController.get)

// Update album
// AlbumRoutes.patch('/albums/:album_id', AlbumController.update) // needs adminAuth

// Delete album
// AlbumRoutes.delete('/albums/:album_id', AlbumController.delete) // needs adminAuth

module.exports = AlbumRoutes