const Album = require('../models/Album')
const Artist = require('../models/Artist')
const Song = require('../models/Song')

module.exports = {
  async create(req, res, next) {
    try {
      const artist = await Artist.findById(req.body.artist)
      const songs = await Song.find().where('_id').in(req.body.songs)

      const playingTime = songs.reduce((total, song) => {
        return total + song.playingTime
      }, 0)

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
  },
  async getById(req, res, next) {
    try {
      const album = await Album.findById(req.params.id)

      if (!album) {
        res.json({ success: false })
      } else {
        res.json({ success: true, album })
      }
    } catch (err) { next(err) }
  },
  async getByArtist(req, res, next) {
    try {
      const albums = await Album.find({ artist: req.params.artist_id }).populate('artist', 'name')

      if (!albums) {
        res.json({ success: false })
      } else {
        res.json({ success: true, albums })
      }
    } catch (err) { next(err) }
  },
  async update(req, res, next) {
    try {
      const where = { _id: req.params.id }
      const updateable = ['title', 'format', 'label', 'releaseYear', 'price', 'playingTime']
      const updates = Object.keys(req.body).reduce((updateObj, key) => {
        updateable.includes(key) && (updateObj[key] = req.body[key])

        return updateObj
      }, {})

      const action = {
        $set: updates
      }

      const updated = await Album.findOneAndUpdate(where, action, { new: true })

      res.json({ success: true, album: updated })
    } catch (err) { next(err) }
  },
  async delete(req, res, next) {
    try {
      const deleted = await Album.findOneAndDelete({ _id: req.params.id })

      if (!deleted) {
        res.json({ success: false })
      } else {
        for (let song of deleted.songs) {
          const songWithRef = await Song.findById(song)
          songWithRef.albums = songWithRef.albums.filter(album => album != req.params.id)
          await songWithRef.save()
        }
        const artistWithRef = await Artist.findById(deleted.artist)
        artistWithRef.albums = artistWithRef.albums.filter(album => album._id != req.params.id)
        await artistWithRef.save()

        res.json({ success: true, deleted })
      }
    } catch (err) { next(err) }
  }
}