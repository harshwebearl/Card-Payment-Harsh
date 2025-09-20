const Payment = require('./Payment.Models');

// Create new payment card
exports.createPayment = async (req, res) => {
	try {
		const payment = new Payment(req.body);
		await payment.save();
		res.status(201).json(payment);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all payment cards
exports.getPayments = async (req, res) => {
	try {
		const payments = await Payment.find();
		res.json(payments);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get single payment card by ID
exports.getPaymentById = async (req, res) => {
	try {
		const payment = await Payment.findById(req.params.id);
		if (!payment) return res.status(404).json({ error: 'Not found' });
		res.json(payment);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Update payment card by ID
exports.updatePayment = async (req, res) => {
	try {
		const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!payment) return res.status(404).json({ error: 'Not found' });
		res.json(payment);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete payment card by ID
exports.deletePayment = async (req, res) => {
	try {
		const payment = await Payment.findByIdAndDelete(req.params.id);
		if (!payment) return res.status(404).json({ error: 'Not found' });
		res.json({ message: 'Deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
