const Customer = require('../models/Customer')

const authorize = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) { throw ('Unauthorized') }
  const token = authorization.replace('Bearer ', '')
  const customer = await Customer.validateToken(token)
  req.customer = customer
  next()
}

module.exports = authorize