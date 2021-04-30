const Album = require('../models/Album')

module.exports = {
  async create(req, res, next) {
    try {
      const album = await Album.create(req.body)

      res.json({ success: true, album })

    } catch (err) { next(err) }
  }
}