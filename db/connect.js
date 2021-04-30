const mongoose = require('mongoose')

const connect = async () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
}

module.exports = connect