const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

// REGISTER
router.post('/register', async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SECRET
		).toString(),
	});

	try {
		// use await since it may take some time to save
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// LOGIN
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(401).json('Wrong credentials!');

		// decrypt the password
		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SECRET
		);

		// compare password then return user data if they match
		const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
		originalPassword !== req.body.password &&
			res.status(401).json('Wrong credentials!');

		// return user data except the password
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
