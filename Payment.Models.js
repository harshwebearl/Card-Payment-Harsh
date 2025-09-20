const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
	cardHolder: { type: String, required: true },
	cardNumber: { type: String, required: true },
	month: { type: String, required: true },
	year: { type: String, required: true },
	cvv: { type: String, required: true },
	amount: { type: String, required: true },
	email: { type: String, required: true },
	mobile: { type: String, required: true },
	address1: { type: String, required: true },
	address2: { type: String },
	city: { type: String, required: true },
	state: { type: String, required: true },
	country: { type: String, default: 'United States' },
	zip: { type: String, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
