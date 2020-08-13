// Token
const tokenCreate = require('../../helpers/tokenCreate');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Models
const User = require('../../models/User');

// User Validation
const { UserLoginEmail, UserLoginUsername } = require('../../validation/users/user.schema');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  headers: false
});

router.post('/login', async (req, res) => {
	
	if (req.body.email) {
		var validation = await UserLoginEmail.validate({ email: req.body.email, password: req.body.password });
	} else {
		var validation = await UserLoginUsername.validate({ username: req.body.username, password: req.body.password });
	}

	if (validation.error) {
		return res.status(400).json({
			code: 400,
			message: validation.error.details[0].message,
		});
	}

	const { email, username, password } = validation.value;

	const findQuery = email ? { email } : { username };

	const user = await User.findOne(findQuery, {
		_id: 1, name: 1, picture: 1, password: 1
	});
	
	if (!user) {
		return res.status(400).json({
			code: 400,
			message: `${email ? 'Email' : 'Username'} not registered.`
		});
	}

	const userPasswordControl = await bcrypt.compare(password, user.password);

	if (!userPasswordControl) { // Şifre yanlış.
		return res.status(400).json({
			code: 400,
			message: 'Password is incorrect.'
		});
	}

	return res.status(200).json({
		code: 200,
		token: tokenCreate(user._id, user.name, user.picture),
	});
});

module.exports = router;