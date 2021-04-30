const Admin = require('../models/Admin')

const adminAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) { throw ('Unauthorized') }
  const token = authorization.replace('Bearer ', '')
  const admin = await Admin.validateToken(token)
  req.admin = admin
  next()
}

module.exports = adminAuth