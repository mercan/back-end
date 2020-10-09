// Token
const tokenCreate = require('../../helpers/tokenCreate');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Models
const User = require('../../models/User');

// User Validation
const { userLoginEmail, userLoginUsername } = require('../../validation/users/user.schema');

// Two Factor Auth
const sendTwoFactorCodeSMS = require('../../services/twoFactorSMS');

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  headers: false
});

function randomCodeGenerate(length) {
	const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	let code = '';

	for (let i = 0; i < length; i++) {
		const random = Math.floor(Math.random() * (list.length - 1));
		code += list[random];
	}

	return code;
}

router.post('/login', limiter, async (req, res) => {
	if (req.body.email) {
		var validation = await userLoginEmail.validate({
			email: req.body.email,
			password: req.body.password,
		});
	} else {
		var validation = await userLoginUsername.validate({
			username: req.body.username,
			password: req.body.password,
		});
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
		_id: 1,
		name: 1,
		picture: 1,
		password: 1,
		username: 1,
		phone_number: 1,
		'settings.twoFactorAuth': 1,
	});
	
	if (!user) {
		return res.status(400).json({
			code: 400,
			message: `${email ? 'Email' : 'Username'} not registered.`
		});
	}

	const userPasswordControl = await bcrypt.compare(password, user.password);

	// Şifre yanlış.
	if (!userPasswordControl) {
		return res.status(400).json({
			code: 400,
			message: 'Password is incorrect.'
		});
	}

	/*
		Eğer şifre doğruysa ama kullanıcı Two Factor Doğrulamayı açmış ise
		ilk olarak code oluşturup sms olarak kodu kullanıcının telefona gönderip
		/two_factor_verify apisi ile kodu doğrulamasını isteyeceğiz eğer kodu doğru
		şekilde girerse tokeni geri döndürüp hesaba giriş yaptıracağız.
	*/
	
	// Şifre doğru.
	if (user.settings.twoFactorAuth) {
		const today = new Date();
		const twoFactorCode = randomCodeGenerate(6);
		const sendSms = await sendTwoFactorCodeSMS(user.phone_number, twoFactorCode);
		today.setHours(today.getHours() + 1);
		
		if (sendSms) {
			await User.updateOne({ username: user.username }, {
				'account.two_factor_code': twoFactorCode,
				'account.two_factor_code_date': today,
			});

			return res.status(200).json({
				code: 200,
				message: 'Confirmation code sent.'
			});

		} else {
			return res.status(500).json({
				code: 500,
				message: 'The system is temporarily unavailable, please try again later.'
			});
		}
		
	}

	return res.status(200).json({
		code: 200,
		token: tokenCreate(user._id, user.name, user.picture),
	});
});

module.exports = router;