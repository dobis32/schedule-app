const express = require('express');
const router = new express.Router();
const Appointment = require('../models/appointment');
router.get('/', async (req, res) => {
	res.redirect('/schedule');
});

router.get('/schedule', async (req, res) => {
	res.render('scheduler');
});

router.post('/appointments/make', async (req, res) => {
	try {
		console.log('[POST /appointments/make]', req.body);

		let valid = true;
		let { year, month, date, time, notes } = req.body;
		if (!year) valid = false;
		else if (!month) valid = false;
		else if (!date) valid = false;
		else if (!time) valid = false;
		else if (
			await Appointment.findOne({
				year: parseInt(year),
				month: parseInt(month),
				date: parseInt(date),
				time
			})
		) {
			console.log(
				await Appointment.find({
					year: parseInt(year),
					month: parseInt(month),
					date: parseInt(date),
					time
				})
			);
			valid = false;
		}

		if (valid) {
			const appointment = new Appointment({
				year: parseInt(year),
				month: parseInt(month),
				date: parseInt(date),
				time: time,
				notes: notes ? notes : 'No notes.'
			});
			appointment.save();
			res.send({ result: true, appointment: appointment });
		} else {
			res.send({ result: false });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

router.get('/appointments', async (req, res) => {
	try {
		console.log('[GET /appointments]', req.query);

		console.log(typeof req.query.year, typeof req.query.month, typeof req.query.date);
		let { year, month, date } = req.query;
		const appointments = await Appointment.find({
			year: parseInt(year),
			month: parseInt(month),
			date: parseInt(date)
		});
		console.log(appointments);
		res.send({ result: true, appointments });
	} catch (error) {
		console.log(error);
		res.send({ result: false });
	}
});

module.exports = router;
