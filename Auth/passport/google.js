// Token
const tokenCreate = require('../../helpers/tokenCreate');

// Package
const router   = require('express').Router();
const fetch    = require('node-fetch');
const passport = require('passport');

// Models
const User = require('../../models/User');

// Helpers
const followSchemaCreate = require('../../helpers/followSchemaCreate');


router.get('/google', passport.authenticate('google', { 
	scope: ['profile', 'email']
}));

router.get('/google/redirect', (req, res) => {
	passport.authenticate('google', async (_, user) => {

		if (!Array.isArray(user) && user.emailError) {
	 		return res.redirect(`https://soru.io/login?email=${user.email}`);
		}
		
		let auth_token;

		if (Array.isArray(user)) {
			auth_token = tokenCreate(user[0]._id, user[0].name, user[0].picture);
		} else {
			auth_token = tokenCreate(user._id, user.name, user.picture);
		}
			
		if (!req.cookies.auth_token) {
			res.cookie('auth_token', auth_token, 
				{ maxAge: 30 * 24 * 3600 * 1000, secure: true }
			);
		}

		if (Array.isArray(user) && user[1].newUser) {
			const ipAddress = req.headers['x-forwarded-for'] || 
				req.connection.remoteAddress;

			const location = await fetch(`https://ipapi.co/${ipAddress}/json`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				}
			}).then(res => res.json());
			
			user[0].location = {
				city: location.city,
				countryName: location.country_name,
				countryCode: location.country_code,
				timezone: location.timezone,
				currency: location.currency
			}
			
			const saveUser = await user[0].save();
			await followSchemaCreate(user[0]._id);

	 		return res.redirect(`https://soru.io/add/username?token=${auth_token}`);		
		}
				
 		res.redirect(`https://soru.io/tokenverify?token=${auth_token}`);
 		
	})(req, res);
});

module.exports = router;