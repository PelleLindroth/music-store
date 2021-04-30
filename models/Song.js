const mongoose = require('mongoose')
const { Schema } = mongoose

const songSchema = new Schema({
  title: {
    type: String,
    required: [true, 'No song title provided']
  },
  artists: [{
    type: Schema.Types.ObjectId, ref: 'Artist'
  }],
  albums: [{
    type: Schema.Types.ObjectId, ref: 'Album'
  }],
  composer: [{
    type: Schema.Types.ObjectId, ref: 'Artist'
  }],
  playingTime: {
    type: Number,
    required: [true, 'No playingTime for song provided']
  }
})