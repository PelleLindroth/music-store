const mongoose = require('mongoose')
const { Schema } = mongoose

const artistSchema = new Schema({
  name: {
    type: String,
    required: [true, 'No artist name provided']
  },
  albums: [{
    type: Schema.Types.ObjectId, ref: 'Album'
  }]
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist