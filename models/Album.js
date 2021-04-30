const mongoose = require('mongoose')
const { Schema } = mongoose

const albumSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId, ref: 'Artist',
    required: [true, 'No artist provided']
  },
  songs: [{
    type: Schema.Types.ObjectId, ref: 'Song',
    required: [true, 'No songs provided']
  }],
  label: {
    type: String,
    default: 'No label provided'
  },
  format: {
    type: String,
    required: [true, 'No format provided']
  },
  playingTime: Number,
  releaseYear: Number,
  price: {
    type: Number,
    currency: {
      type: String,
      default: 'EUR'
    },
    required: [true, 'No price provided']
  }
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album