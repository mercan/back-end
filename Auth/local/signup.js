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

// New Account Email Publisher RabbitMQ
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
	
	const ipAddress = req.headers['x-forwarded-for'] || 
	req.connection.remoteAddress;

	if (
		!name || !email || !username || !password ||
		name && name.length > 40 || name.length < 6 ||
		email && email.length > 60 || email.length < 14 ||
		username && username.length > 40 || username.length < 3 ||
		password && password.length > 80 || password.length < 7
	) {
		return res.status(400).json({ code: 400 });
	}	

	const usernameControl = await User.findOne({ username }, '_id');

	if (usernameControl) {
		return res.status(400).json({ code: 4006 });
	} 

	const emailControl = await User.findOne({ email }, '_id');

	if (emailControl) {
		return res.status(400).json({ code: 4007 });
	}

	const location = await fetch(`https://ipapi.co/${ipAddress}/json`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	}).then(res => res.json());


	bcrypt.hash(req.body.password, 10, async (err, hashPassword) => {
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

		const saveUser = await newUser.save();

		if (saveUser) {
			await followSchemaCreate(newUser._id);

			const userInfo = {
				email: newUser.email,
				name: newUser.name,
			}
			
			sendEmailPublisher(userInfo);

			return res.status(200).json({
				code: 200, 
				token: tokenCreate(newUser._id, newUser.name, newUser.picture)			
			});
		}

		res.status(400).json({ code: 304 });
	});
});

module.exports = router;
