const Artist = require('../models/Artist')
const Song = require('../models/Song')

module.exports = {
  async create(req, res, next) {
    try {
      let composers = []
      if (req.body.composers) {
        composers = await Artist.find().where('_id').in(req.body.composers)
      }
      const artists = await Artist.find().where('_id').in(req.body.artists)

      const song = await Song.create({
        title: req.body.title,
        artists,
        composers,
        playingTime: req.body.playingTime
      })

      if (!song) {
        res.json({ success: false })
      } else {
        res.json({ success: true, song })
      }

    } catch (err) { next(err) }
  }
}