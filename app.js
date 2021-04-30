const express = require('express')
require('dotenv').config()
const app = express()
const connect = require('./db/connect')
const PORT = process.env.PORT
const CustomerRoutes = require('./routes/CustomerRoutes')

app.use(express.json())

app.use('/api/v1', CustomerRoutes)

  ; (async () => {
    await connect()
    console.log('Connected to database')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })()