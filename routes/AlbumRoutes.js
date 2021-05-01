const express = require('express')
const AlbumRoutes = express.Router()
const AlbumController = require('../controllers/AlbumController')
const adminAuth = require('../middleware/adminAuth')

// Create new album
AlbumRoutes.post('/albums', AlbumController.create) // needs adminAuth

// Get all albums
AlbumRoutes.get('/albums', AlbumController.get)

// Get albums by artist
AlbumRoutes.get('/albums/artist/:artist_id', AlbumController.getByArtist)

// Get album by id
AlbumRoutes.get('/albums/:id', AlbumController.getById)

// Update album
AlbumRoutes.patch('/albums/:id', AlbumController.update) // needs adminAuth

// Delete album
AlbumRoutes.delete('/albums/:id', AlbumController.delete) // needs adminAuth

module.exports = AlbumRoutes