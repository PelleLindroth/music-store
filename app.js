const express = require('express')
require('dotenv').config()
const app = express()
const connect = require('./db/connect')
const PORT = process.env.PORT
const Routes = Object.values(require('./routes'))

app.use(express.json())

app.use('/api/v1', Routes)

  ; (async () => {
    await connect()
    console.log('Connected to database')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })()