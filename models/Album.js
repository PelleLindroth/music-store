const mongoose = require('mongoose')
const { Schema } = mongoose

const albumSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId, ref: 'Artist',
    required: [true, 'No artist supplied']
  },
  songs: [{
    type: Schema.Types.ObjectId, ref: 'Song'
  }],
  label: {
    type: String,
    default: 'No label'
  },
  playingTime: Number,
  releaseYear: Number
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album