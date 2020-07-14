const tokenCreate = require('../../helpers/tokenCreate');
const rateLimit   = require('express-rate-limit');
const User   = require('../../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30
});


router.post('/login', async (req, res) => {
	const [ email, username, password ] = [ 

		req.body.email ? req.body.email.trim() : false,
		req.body.username ? req.body.username.trim() : false,
		req.body.password
	];


	if (
		!email   && !username || !password ||
		email    && email.length > 60 || email.length < 14 ||
		username && username.length > 40 || username.length < 3 ||
		password && password.length > 80 || password.length < 7
	) {
		return res.status(400).json({ code: 400 });
	}

	let user;

	if (username) {
		user = await User.findOne({ username }, {
			_id: 1, name: 1, picture: 1, password: 1
		});

	} else if (email) {
		user = await User.findOne({ email	}, {
			_id: 1, name: 1, picture: 1, password: 1
		});
	}

	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	const userPasswordControl = await bcrypt.compare(password, user.password);

	if (!userPasswordControl)  {
		return res.status(400).json({ code: 4042 });
	}

	return res.json(
		{ 
			code: 200, token: tokenCreate(user._id, user.name, user.picture)
		}
	);
});


module.exports = router;