// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Models
const User = require('../../models/User');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  headers: false
});

router.post('/change_email', limiter, VerifyToken, async (req, res) => {
	const email = req.body.email.trim();

	if (!email || email.length > 60 || email.length < 14) {
		return res.status(400).json({ code: 400 });
	}

	const user = await User.findOne({ _id: req.decode.userid }, 'email');

	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	const emailControl = await User.findOne({ email }, '_id');

	if (emailControl) {
		return res.status(400).json({ code : '4000email' });
	}

	if (email === user.email) {
		return res.status(400).json({ code: 400 });
	}

	const updateEmail = await User.updateOne({ _id: req.decode.userid }, {
		email
	});

	return updateEmail.nModified ? res.json({ code: 200 }) :
	res.status(400).json({ code: 304 });
});


router.post('/change_password', limiter, VerifyToken, async (req, res) => {
	const { newPassword, password } = req.body;
	
	if (
		!newPassword || !password || newPassword.length > 80 ||
		newPassword.length < 7
	) {
		return res.status(400).json({ code: 400 });
	}

	const user = await User.findOne({ _id: req.decode.userid }, 'password');

	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	const passwordCheck = await bcrypt.compare(password, user.password);

	if (!passwordCheck) {
		return res.status(400).json({ code: '4000pass' });
	}

	if (await bcrypt.compare(newPassword, user.password)) {
		return res.status(400).json({ code: 400 });
	}

	const hashPassword = await bcrypt.hash(newPassword, 10);

	const updatePassword = await User.updateOne({ _id: req.decode.userid }, {
		password: hashPassword
	});

	return updatePassword.nModified ? res.json({ code: 200 }) :
	res.status(400).json({ code: 304 });
});


router.post('/change_name', limiter, VerifyToken, async (req, res) => {
	const name = req.body.name.trim();

	if (!name || name.length > 40 || name.length < 3) {
		return res.status(400).json({ code: 400 });
	}

	const user = await User.findOne({ _id: req.decode.userid }, 'name');

	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	if (name === user.name) {
		return res.status(400).json({ code: '4000name' });
	}

	const updateName = await User.updateOne({ _id: req.decode.userid }, {
		name
	});

	return updateName.nModified ? res.json({ code: 200 }) :
	res.status(400).json({ code: 304 });
});


router.post('/change_username', limiter, VerifyToken, async (req, res) => {
	const username = req.body.username.trim();

	if (!username || username.length > 40 || username.length < 3) {
		return res.status(400).json({ code: 400 });
	}

	const user = await User.findOne({ _id: req.decode.userid }, '_id');

	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	const usernameControl = await User.findOne({ username }, '_id');

	if (usernameControl) {
		return res.status(400).json({ code: 4006 });
	}

	const usernameUpdate = await User.updateOne({ _id: req.decode.userid }, {
		username
	});

	return usernameUpdate.nModified ? res.json({ code: 200 }) :
	res.status(304).json({ code: 304 });
});


module.exports = router;