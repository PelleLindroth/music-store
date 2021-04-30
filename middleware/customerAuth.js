const Customer = require('../models/Customer')

const customerAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) { throw ('Unauthorized') }
  const token = authorization.replace('Bearer ', '')
  const customer = await Customer.validateToken(token)
  req.customer = customer
  next()
}

module.exports = customerAuth
