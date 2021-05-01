const express = require('express')
require('dotenv').config()
const app = express()
const connect = require('./db/connect')
const PORT = process.env.PORT
const AdminRoutes = require('./routes/AdminRoutes')
const CustomerRoutes = require('./routes/CustomerRoutes')
const ArtistRoutes = require('./routes/ArtistRoutes')
const AlbumRoutes = require('./routes/AlbumRoutes')
const SongRoutes = require('./routes/SongRoutes')
// test comment new gh token
app.use(express.json())

app.use('/api/v1', AdminRoutes, CustomerRoutes, ArtistRoutes, AlbumRoutes, SongRoutes)

  ; (async () => {
    await connect()
    console.log('Connected to database')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })()