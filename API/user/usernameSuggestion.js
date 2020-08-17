const VerifyToken = require('../../middleware/api-verify-token');
const rateLimit   = require('express-rate-limit');
const User        = require('../../models/User');
const router      = require('express').Router();

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 40,
  headers: false
});

router.post('/username-suggestion', limiter, VerifyToken, async (req, res) => {
	const name = req.decode.name.split(" ")[0];
	const randomLength = Math.floor(Math.random() * 10) + 1;

	const randomUsernameArray = [];
	let randomUsername;

	while (true) {
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
			break;
		}
	}

	return res.json({ code: 200, suggestion: randomUsernameArray });
});


module.exports = router;