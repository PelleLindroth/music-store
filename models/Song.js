const mongoose = require('mongoose')
const { Schema } = mongoose

const songSchema = new Schema({
  title: {
    type: String,
    required: [true, 'No song title provided']
  },
  artists: [{
    type: Schema.Types.ObjectId, ref: 'Artist',
    required: [true, 'No artist id provided']
  }],
  albums: [{
    type: Schema.Types.ObjectId, ref: 'Album'
  }],
  composers: [{
    type: Schema.Types.ObjectId, ref: 'Artist'
  }],
  playingTime: {
    type: Number,
    required: [true, 'No playingTime for song provided']
  }
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song