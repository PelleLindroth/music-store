const express = require('express')
const CustomerRoutes = express.Router()
const CustomerController = require('../controllers/CustomerController')
const customerAuth = require('../middleware/customerAuth')

// Create customer
CustomerRoutes.post('/customers/create', CustomerController.create)

// Login customer
CustomerRoutes.post('/customers/auth', CustomerController.login)

// Get logged in customer
CustomerRoutes.get('/customers/me', customerAuth, CustomerController.get)

// Get all customers
CustomerRoutes.get('/customers', CustomerController.getAll)

// Update customer
CustomerRoutes.patch('/customers', customerAuth, CustomerController.update)

// Delete customer
CustomerRoutes.delete('/customers', customerAuth, CustomerController.delete)

module.exports = CustomerRoutes