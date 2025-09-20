const express = require('express');
const router = express.Router();

const paymentController = require('./Payment.Controller');
const adminAuth = require('./adminAuth');


// Create (public or protected as needed)
router.post('/', paymentController.createPayment);

// Read all (admin only)
router.get('/', adminAuth, paymentController.getPayments);

// Read one (admin only)
router.get('/:id', adminAuth, paymentController.getPaymentById);

// Update (admin only)
router.put('/:id', adminAuth, paymentController.updatePayment);

// Delete (admin only)
router.delete('/:id', adminAuth, paymentController.deletePayment);

module.exports = router;
