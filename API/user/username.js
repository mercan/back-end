// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const router = require('express').Router();

// Models
const User = require('../../models/User');

router.post('/username-suggestion', VerifyToken, async (req, res) => {
	const name = req.decode.name.split(" ")[0];
	const randomLength = Math.floor(Math.random() * 10) + 1;

	const randomUsernameArray = [];
	let randomUsername;
	let check;

	while (!check) {
		for (let i = 0; i < randomLength; i++) {
			const randomNumber = String(Math.floor(Math.random() * 9));

			if (i === 0) {
				randomUsername = name + randomNumber;
			}

			randomUsername += randomNumber;
		}

		const username = await User.findOne({ username: randomUsername }, '_id');

		if (!username) {
			randomUsernameArray.push(randomUsername);
		}

		if (randomUsernameArray.length === 5) {
			check = true;
		}
	}

	return res.json({ code: 200, suggestion: randomUsernameArray });
});


router.post('/username-add', VerifyToken, async (req, res) => {
	const username = req.body.username;

	if (!username || username.length > 40 || username.length < 3) {
		return res.status(400).json({ code: 400 });
	}

	const user = await User.findOne({ _id: req.decode.userid }, '_id');

	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	const usernameControl = await User.findOne({ username }, '_id');

	if (usernameControl) {
		return res.status(400).json({ code: 4006 });
	}

	const usernameUpdate = await User.updateOne({ _id: req.decode.userid }, {
		username
	});

	return usernameUpdate.nModified ? res.json({ code: 200 })
		: res.status(304).json({ code: 304 });
});

module.exports = router;