// Token
const tokenCreate = require('../../helpers/tokenCreate');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

// Models
const User = require('../../models/User');

// Validation
const { isTwoFactorCode } = require('../../validation/users/user.schema');

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  headers: false
});

// Link : localhost:3000/two_factor_verify&username=Test&code=012345
router.get('/two_factor_verify', limiter, async (req, res) => {
	const validation = await isTwoFactorCode.validate(req.query);

	if (validation.error) {
		return res.status(400).json({
			code: 400,
			message: validation.error.details[0].message,
		});
	}

	const { username, code } = validation.value;

	const user = await User.findOne({ username }, {
		_id: 1,
		name: 1,
		picture: 1,
		'account.two_factor_code': 1,
		'account.two_factor_code_date': 1,
	});

	if (!user) {
		return res.status(400).json({
			code: 400,
			message: 'User not found.'
		});
	}

	if (code === user.account.two_factor_code) {
		// Kodun geçerlilik süresi dolmuş mu ?
		if (new Date() <= user.account.two_factor_code_date) {
			await User.updateOne({ username }, {
				'account.two_factor_code': "",
			});

			return res.status(200).json({
				code: 200,
				token: tokenCreate(user._id, user.name, user.picture),
			});
		}

		return res.status(400).json({
			code: 400,
			message: 'The validity of the code has expired.',
		});
	}

	return res.status(400).json({
		code: 400,
		message: 'Invalid code.',
	});

});

module.exports = router;