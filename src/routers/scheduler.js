const express = require('express');
const router = new express.Router();
const Appointment = require('../models/appointment');
router.get('/', async (req, res) => {
	res.redirect('/schedule');
});

router.get('/schedule', async (req, res) => {
	res.render('scheduler');
});

module.exports = router;
