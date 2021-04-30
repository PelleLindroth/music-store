const express = require('express')
const AlbumRoutes = express.Router()
const AlbumController = require('../controllers/AlbumController')

// Create new album
AlbumRoutes.post('/albums/create', AlbumController.create)

// Get album by id
// AlbumRoutes.get('/albums/:id', AlbumController.getById)

// Get albums by artist
// AlbumRoutes.get('/albums/:artist_id', AlbumController.getByArtist)

// Get all albums
// AlbumRoutes.get('/albums', AlbumController.get)

// Update album
// AlbumRoutes.patch('/albums/:album_id', AlbumController.update)

// Delete album
// AlbumRoutes.delete('/albums/:album_id', AlbumController.delete)

module.exports = AlbumRoutes