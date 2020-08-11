const rateLimit = require('express-rate-limit');
const router = require('express').Router();
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

// Models
const User = require('../../models/User');

// RabbitMQ Publisher
const resetPassword = require('../../services/publisherResetPassword');

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 10,
	headers: false
});

const resetPasswordCodeCreate = number => {
	const RandomArray = [
		0, 'A', 1,  'B', 'C', 3, 'D', 4, 'J', 5, 6, 'K', 7, 8, 9, 'Q', 'W', 'E', 2, 
	 'R', 3, 'T', 'Y', 8, 4, 5, 6, 'U', 'I', 'O', 'P', 8 , 9, 'A', 'S', 'D', 4, 4,
	  9, 'F', 'G', 'H', 'J', 'K', 'L', 0, 'Z', 'X', 'C', 9, 5, 'V', 'B', 0, 'N', 6,
	  'M', 4, 6, 'M', 'D', 'E', 'I', 'J', 'K', 'L', 'U', 3, 6, 3, 2,'T', 'E', 'I',8
	];

	let randomCode = '';
	for (let i = 0; i < number; i++) {
		const random = Math.floor(Math.random() * (RandomArray.length - 1));
		randomCode += RandomArray[random];
	}
	return randomCode;
};

router.get('/reset_password', limiter, async (req, res) => {
	const { email, username } = req.query;

	if (!email && !username) {
		return res.status(400).json({
			code: 400,
			message: 'Email or username cannot be empty.',
		});
	}

	const updateCodeAndDateAndSendEmail = async email => {
		const resetPasswordCode = resetPasswordCodeCreate(6);

		const today = new Date();
		today.setHours(today.getHours() + 1);

		await User.updateOne({ email }, {
			'account.reset_password_code': resetPasswordCode,
			'account.reset_password_code_date': today,
		});

		resetPassword({ email, resetCode: resetPasswordCode });
	}

	if (email) {
		const user = await User.findOne({ email }, '_id connect');

		if (!user) {
			return res.status(400).json({
				code: 400,
				message: 'User not found.',
			});
		}

		if (user.connect) {
			return res.status(400).json({
				code: 400,
				message: `Because you are connected with ${user.connect}, the password cannot be changed.`
			});
		}

		updateCodeAndDateAndSendEmail(email);

		return res.status(200).json({
			code: 200,
			message: 'Password reset email has been sent.'
		});
	}

	const user = await User.findOne({ username }, 'email connect');

	if (!user) {
		return res.status(400).json({
			code: 400,
			message: 'User not found.',
		});
	}

	if (user.connect) {
		return res.status(400).json({
			code: 400,
			message: `Because you are connected with ${user.connect}, the password cannot be changed.`
		});
	}

	if (!user.email) {
		return res.status(400).json({
			code: 400,
			message: `Unable to find email on the account matching ${username}`,
		});
	}

	updateCodeAndDateAndSendEmail(user.email);
	
	return res.status(200).json({
		code: 200,
		message: 'Password reset email has been sent.'
	});

});


router.get('/reset_password_verify', limiter, async (req, res) => {
	const { code, email, username } = req.query;

	if (!email && !username) {
		return res.status(400).json({
			code: 400,
			message: 'Email or username cannot be empty.',
		});
	}

	if (!code) {
		return res.status(400).json({
			code: 400,
			message: 'Code cannot be empty.',
		});
	}
	
	const query = email ? { email } : { username };

	const user = await User.findOne(query).select({
		connect: 1,
		'account.reset_password_code': 1,
		'account.reset_password_code_date': 1,
	});

	if (!user) {
		return res.status(400).json({
			code: 400,
			message: 'User not found.',
		});
	}

	if (code === user.account.reset_password_code) {
		if (new Date() <= user.account.reset_password_code_date) {
			if (!user.connect) {
				return res.status(200).json({
					code: 200,
					message: 'Correct code.'
				});
			}
			
			return res.status(400).json({
				code: 400,
				message: `Because you are connected with ${user.connect}, the password cannot be changed.`
			})
		}

		return res.status(400).json({
			code: 400,
			message: 'The validity of the code has expired.'
		});
	}

	return res.status(400).json({
		code: 400,
		message: 'Invalid Code.'
	});

});


router.post('/reset_password_change', limiter, async (req, res) => {
	const { code, email, username, password } = req.body;

	if (!email && !username) {
		return res.status(400).json({
			code: 400,
			message: 'Email or username cannot be empty.',
		});
	}

	if (!password || password.length > 80 || password.length < 7) {
		return res.status(400).json({
			code: 400,
			message: 'Password is empty or invalid.',
		});
	}

	if (!code) {
		return res.status(400).json({
			code: 400,
			message: 'Code cannot be empty.',
		});
	}

	const url = `http://localhost:3000/reset_password_verify?code=${code}&${email ? 'email' : 'username'}=${email ? email : username}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	}).then(async response => {
		if (response.status === 429) {
			return res.status(429).json({
				code: 429,
				message: response.statusText
			});
		}

		const resp = await response.json();
		
		if (resp.code === 400) {
			return res.status(400).json({
				code: 400,
				message: resp.message,
			})
		}

		return resp;
	});

	if (response.statusCode === 400) {
		return;
	}

	const query = email ? { email } : { username };
	const hashPassword = bcrypt.hashSync(password, 10);

	const user = await User.findOne(query, 'password');

	const updatePassword = await User.updateOne(query, {
		$push: {
			oldPasswords: {
				password: user.password
			}
		},
		password: hashPassword,
		'account.reset_password_code': '',
	});

	return res.status(200).json({
		code: 200,
		message: 'The password has been changed.'
	});
});

module.exports = router;