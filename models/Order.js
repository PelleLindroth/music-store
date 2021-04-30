const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
  items: [{
    type: Schema.Types.ObjectId, ref: 'Album'
  }],
  createdAt: Date,
  payed: {
    type: Boolean,
    default: false
  },
  delivered: {
    type: Boolean,
    default: false
  },
  customer: {
    type: Schema.Types.ObjectId, ref: 'Customer',
    required: [true, 'No customer supplied']
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order