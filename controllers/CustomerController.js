const Customer = require('../models/Customer')

module.exports = {
  async create(req, res, next) {
    try {
      const customer = await Customer.create(req.body)

      const response = {
        success: true,
        customer: {
          id: customer._id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          address: customer.address
        }
      }

      res.json(response)
    } catch (err) { next(err) }
  },
  async login(req, res, next) {
    try {
      const customer = await Customer.authenticate(req.body)
      res.json(customer)
    } catch (err) { next(err) }
  },
  async get(req, res, next) {
    try {
      const customer = await Customer.findOne({ email: req.customer.email })

      res.json({ success: true, customer: { id: customer._id, firstName: customer.firstName, lastName: customer.lastName, address: customer.address, email: customer.email, orders: customer.orders } })
    } catch (err) { next(err) }
  },
  async getAll(req, res, next) {
    try {
      const customers = await Customer.find()

      res.json({ success: true, count: customers.length, customers })
    } catch (err) { next(err) }
  },
  async update(req, res, next) {
    try {
      const where = { email: req.customer.email }
      const updateable = ['firstName', 'lastName', 'address']
      const updates = Object.keys(req.body).reduce((updateObj, key) => {
        updateable.includes(key) && (updateObj[key] = req.body[key])

        return updateObj
      }, {})
      console.log(updates);
      const action = {
        $set: updates
      }

      const updated = await Customer.findOneAndUpdate(where, action, { new: true })
      console.log(updated);
      if (!updated) {
        res.json({ success: false, message: 'Could not update' })
      } else {
        const response = {
          success: true,
          user: {
            id: updated._id,
            firstName: updated.firstName,
            lastName: updated.lastName,
            address: updated.address,
            email: updated.email,
            orders: updated.orders
          }
        }
        res.json(response)
      }

    } catch (err) { next(err) }
  },
  async delete(req, res, next) {
    try {
      const deleted = await Customer.findOneAndDelete({ email: req.customer.email })

      if (!deleted) {
        res.json({ success: false, message: 'Could not delete' })
      } else {
        res.json({ success: true, message: 'Customer deleted' })
      }
    } catch (err) { next(err) }
  }
}
