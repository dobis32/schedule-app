const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
	year: {
		type: Number,
		required: true
	},
	month: {
		type: Number,
		required: true
	},
	date: {
		type: Number,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	notes: {
		type: String,
		required: false
	}
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
