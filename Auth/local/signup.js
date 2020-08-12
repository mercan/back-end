// Token
const tokenCreate = require('../../helpers/tokenCreate');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();
const fetch  = require('node-fetch');
const bcrypt = require('bcrypt');
const amqp = require('amqplib');

// Models
const User = require('../../models/User');

// Helpers
const followSchemaCreate = require('../../helpers/followSchemaCreate');

// RabbitMQ Publisher 
const sendEmailPublisher = require('../../services/publisherSendEmailNewAccount');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20
});

router.post('/signup', limiter, async (req, res) => {
	const [ name, email, username, password ] = [

		req.body.name ? req.body.name.trim() : false,
		req.body.email ? req.body.email.trim() : false,
		req.body.username ? req.body.username.trim() : false,
		req.body.password,
	];

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

	const usernameControl = await User.findOne({ username }, '_id');
	const emailControl = await User.findOne({ email }, '_id');

	if (usernameControl && emailControl) {
		return res.status(400).json({
			code: 400,
			message: 'Username and email are used.',
		});

	} else if (usernameControl) {
		return res.status(400).json({
			code: 400,
			message: 'Username are used.',
		});

	} else if (emailControl) {
		return res.status(400).json({
			code: 400,
			message: 'Email are used.',
		});
		
	}

	const ipAddress = req.headers['x-forwarded-for'] || 
	req.connection.remoteAddress;

	const location = await fetch(`https://ipapi.co/${ipAddress}/json`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	}).then(res => res.json());

	const hashPassword = bcrypt.hashSync(password, 10);

	// Fotoğraf da al.
	const newUser = new User({
		name,
		username,
		email,
		password: hashPassword,
		picture: req.body.picture || 'https://www.booksie.com/files/profiles/22/mr-anonymous.png',
		location: {
			city: location.city,
			countryName: location.country_name,
			countryCode: location.country_code,
			timezone: location.timezone,
			currency: location.currency
		}
	});

	try {
		await newUser.save();
		await followSchemaCreate(newUser._id);
		sendEmailPublisher({ email, username });
	} catch (error) {
		console.error(error);
	}
	
	return res.status(200).json({
		code: 200, 
		token: tokenCreate(newUser._id, newUser.name, newUser.picture)	,		
	});

});

module.exports = router;
