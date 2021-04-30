const Artist = require('../models/Artist')
const { getAll } = require('./CustomerController')

module.exports = {
  async create(req, res, next) {
    try {
      const artist = await Artist.create(req.body)

      res.json(artist)
    } catch (err) { next(err) }
  },
  async getById(req, res, next) {
    const artist = await Artist.findById(req.params.artist_id)

    if (!artist) {
      res.send({ success: false, message: `No artist found with id ${req.params.artist_id}` })
    }
  },
  async getAll(req, res, next) {
    const artists = await Artist.find()

    res.json(artists)
  }
}