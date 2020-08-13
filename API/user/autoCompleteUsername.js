// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

// Models
const User = require('../../models/User');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 70,
  headers: false
});

router.get('/username-search', limiter, async (req, res) => {
	const { username } = req.query;
	const returnArray  = [];
	
	if (!username) {
		return res.status(400).json({
			code: 400,
			message: 'Username cannot be empty'
		});
	}

	// Return data: [ { username: "Username"}, { username: "Username"} ]
	const usernameSearch = await User.find(
		{ 
			username: { $regex: new RegExp(`^${username}`, 'i') } 
		},
		{
			_id: 0, username: 1
		}
	).limit(5);
	

	for (let i = 0; i < usernameSearch.length; i++) {
		returnArray[i] = usernameSearch[i].username;
	}

	return res.status(200).json({
		code: 200,
		usernames: returnArray
	});

});

module.exports = router;