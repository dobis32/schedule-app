const express = require('express');
const router = new express.Router();
const Appointment = require('../models/appointment');
router.get('/', async (req, res) => {
	res.redirect('/schedule');
});

router.get('/schedule', async (req, res) => {
	res.render('scheduler');
});

router.get('/make', async (req, res) => {
	try {
		const apt = new Appointment({
			year: 2020,
			month: 2,
			day: 23,
			notes: 'something special to note about appointment'});
		apt.save();
		res.send(apt);
	} catch(error) {
		console.log(error);
		res.status(500).send(error);
	}
});

router.post('/appointments', async (req, res) => {
	try {
		console.log(req.body);
		let body = '';
		if((typeof req.body).toUpperCase() == 'STRING') body = JSON.parse(req.body);
		else body = req.body;
		const appointments = await Appointment.findAll(body);
		console.log(appointments);
	} catch(error) {
		console.log(error);
	}
});

module.exports = router;
