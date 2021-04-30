const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    street: String,
    zip: String,
    city: String,
    country: String
  },
  orders: [{
    type: Schema.Types.ObjectId, ref: 'Order'
  }]
})

customerSchema.pre('save', async function () {
  const customer = this

  customer.password = bcrypt.hashSync(customer.password, 10)
})

const Customer = mongoose.model('Customer', customerSchema)

Customer.authenticate = async ({ email, password }) => {
  const customer = await Customer.findOne({ email })

  if (!customer) return ({ success: false, message: 'Invalid credentials. Please check your email' })

  const valid = bcrypt.compareSync(password, customer.password)

  if (valid) {
    const payload = { email, id: customer.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return { success: true, customer: { id: customer.id, name: customer.name, email: customer.email }, token }
  } else {
    return ({ success: false, message: 'Access denied. Your email and password don\'t match' })
  }
}

Customer.validateToken = async (token) => {
  try { return jwt.verify(token, process.env.JWT_SECRET) }
  catch (err) { return err } // throw tokenExpired/Unauthorized
}

module.exports = Customer