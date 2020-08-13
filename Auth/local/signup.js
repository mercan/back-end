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

// User Validation
const { UserSignUpSchema } = require('../../validation/users/user.schema');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  headers: false
});

router.post('/signup', limiter, async (req, res) => {
	const validation = await UserSignUpSchema.validate(req.body);

	if (validation.error) {
		return res.status(400).json({
			code: 400,
			message: validation.error.details[0].message,
		});
	}

	const { name, email, username, password } = validation.value;
	
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
