// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

// Models
const User = require('../../models/User');

// Validation
const { isTwoFactorAuth } = require('../../validation/users/user.settings');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  headers: false
});

async function userControlAndReturnData(res, _id, requestData = '_id') {
	const user = await User.findOne({ _id }, requestData);

	if (!user) {
		return res.status(400).json({
			code: 400,
			message: 'User not found.',
		});
	}

	return user;
}

// http://localhost:3000/user_settings/two_factor_auth?active=(false || true)
router.get('/user_settings/two_factor_auth', VerifyToken, limiter, async (req, res) => {
	const validation = await isTwoFactorAuth.validate(req.query);
	
	if (validation.error) {
		return res.status(400).json({
			code: 400,
			message: validation.error.details[0].message,
		});
	}

	const { active } = validation.value;

	const user = await userControlAndReturnData(res, req.decode.userid, {
		phone_number: 1,
		'settings.twoFactorAuth': 1,
	});

	if (!user) {
		return;
	}

	if (!user.phone_number) {
		return res.status(400).json({
			code: 400,
			message: 'Phone number is required for two-factor verification.'
		});
	}

	// Active ile var olan değer eşleşmiyorsa.
	if (active !== user.settings.twoFactorAuth) {
		await User.updateOne({ _id: req.decode.userid }, {
			'settings.twoFactorAuth': active,
		});
	}

	return res.status(200).json({ code: 200 });
});

module.exports = router;