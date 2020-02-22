const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
	year: {
		type: Number,
		required: true
	},
	month: {
		type: String,
		required: true
	},
	day: {
		type: Number,
		required: true
	},
	notes: {
		type: String,
		required: false
	}
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
