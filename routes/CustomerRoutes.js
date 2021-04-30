const express = require('express')
const CustomerRoutes = express.Router()
const CustomerController = require('../controllers/CustomerController')
const authorize = require('../middleware/authorize')

// Create customer
CustomerRoutes.post('/customers/create', CustomerController.create)

// Login customer
CustomerRoutes.post('/customers/auth', CustomerController.login)

// Get logged in customer
CustomerRoutes.get('/customers/me', authorize, CustomerController.get)

// Get all customers
CustomerRoutes.get('/customers', CustomerController.getAll)

// Update customer
CustomerRoutes.patch('/customers', authorize, CustomerController.update)

// Delete customer
CustomerRoutes.delete('/customers', authorize, CustomerController.delete)

module.exports = CustomerRoutes