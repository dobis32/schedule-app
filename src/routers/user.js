const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.get('/login', async (req, res) => {
	res.render('login');
});

router.get('/signup', async (req, res) => {
	res.render('signup');
});

router.post('/user/create', async (req, res) => {
	try {
		let { username, password, name } = req.body;
		if (!username || !password) throw new Error('missing/invalid login credentials');
		const user = new User({ username, password, name: name ? name : 'User' });
		await user.save();
		res.send({ result: true, user });
	} catch (error) {
		console.log(error);
		res.send({ result: false });
	}
});

router.post('/user/login', async (req, res) => {
	try {
		let { username, password } = req.body;
		if (!username || !password) throw new Error('missing/invalid login credentials');
		let user = await User.findOne({ username, password });
		console.log('POST login user:', user);
		if (!user) throw new Error('no user found');
		res.send({ result: true, user });
	} catch (error) {
		console.log(error);
		res.send({ result: false });
	}
});

module.exports = router;
