const Admin = require('../models/Admin')

module.exports = {
  async create(req, res, next) {
    try {
      await Admin.create(req.body)

      res.json({ success: true, message: 'Admin created' })
    } catch (err) { next(err) }
  },
  async get(req, res, next) {
    try {
      const admin = await Admin.findOne({ email: req.admin.email })

      if (!admin) { res.json({ success: false, message: 'No results' }) }

      res.json(admin)
    } catch (error) {
      next(err)
    }
  },
  async login(req, res, next) {
    try {
      const admin = await Admin.authenticate(req.body)
      res.json(admin)
    } catch (err) { next(err) }
  },
}