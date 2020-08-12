const tokenCreate = require('../../helpers/tokenCreate');
const rateLimit   = require('express-rate-limit');
const User   = require('../../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30
});

router.post('/login', async (req, res) => {
	const { email = false, username = false, password = false } = req.body;

	if (!email && !username) {
		return res.status(400).json({
			code: 400,
			message: 'Email or Username cannot be empty.'
		});

	} else if (email && email.length > 60 || email.length < 14) {
		return res.status(400).json({
			code: 400,
			message: 'Email is invalid.',
		});

	} else if (username && username.length > 40 || username.length < 3) {
		return res.status(400).json({
			code: 400,
			message: 'Username is invalid.',
		});

	} else if (password && password.length > 80 || password.length < 7) {
		return res.status(400).json({
			code: 400,
			message: 'The password must be at most 80 letters long and at least 7 letters long.',
		});
	}
	
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