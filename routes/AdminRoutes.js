const express = require('express')
const AdminRoutes = express.Router()
const AdminController = require('../controllers/AdminController')
const adminAuth = require('../middleware/adminAuth')

// Create admin
AdminRoutes.post('/admin', AdminController.create)

// Login admin
AdminRoutes.post('/admin/auth', AdminController.login)

// Get logged in admin
AdminRoutes.get('/admin', adminAuth, AdminController.get)

module.exports = AdminRoutes