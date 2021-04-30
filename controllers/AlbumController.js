const Album = require('../models/Album')
const Artist = require('../models/Artist')
const Song = require('../models/Song')

module.exports = {
  async create(req, res, next) {
    try {
      const artist = await Artist.findById(req.body.artist)
      const songs = await Song.find().where('_id').in(req.body.songs)
      console.log(songs);
      const playingTime = songs.reduce((total, song) => {
        return total + song.playingTime
      }, 0)

      console.log(playingTime)

      const album = {
        title: req.body.title,
        artist: artist._id,
        songs: songs.map(song => song._id),
        label: req.body.label,
        format: req.body.format,
        playingTime: playingTime,
        releaseYear: req.body.releaseYear,
        price: req.body.price
      }

      const created = await Album.create(album)

      for (let song of songs) {
        song.albums.push(created._id)
        await song.save()
      }

      artist.albums.push(created._id)
      await artist.save()

      res.json({ success: true, album: created })

    } catch (err) { next(err) }
  },
  async get(req, res, next) {
    try {
      const albums = await Album.find()
        .populate('artist', 'name')
        .populate('songs', 'title')

      res.json({ success: true, count: albums.length, albums })
    } catch (err) { next(err) }
  }
}