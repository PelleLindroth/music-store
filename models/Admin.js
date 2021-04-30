const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

adminSchema.pre('save', async function () {
  const admin = this

  admin.password = bcrypt.hashSync(admin.password, 10)
})

const Admin = mongoose.model('Admin', adminSchema)

Admin.authenticate = async ({ email, password }) => {
  const admin = await Admin.findOne({ email })

  if (!admin) return ({ success: false, message: 'Invalid credentials. Please check your email' })

  const valid = bcrypt.compareSync(password, admin.password)

  if (valid) {
    const payload = { email, id: admin.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return { success: true, token }
  } else {
    return ({ success: false, message: 'Access denied. Email and password don\'t match' })
  }
}

module.exports = Admin