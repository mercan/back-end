const VerifyToken = require('../../middleware/api-verify-token');
const JoinEvent 	= require('../../models/JoinEvent');
const rateLimit 	= require('express-rate-limit');
const router 			= require('express').Router();
const User 				= require('../../models/User');

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 20,
  headers: false
});

router.get('/token-verify', limiter, VerifyToken, async (req, res) => {
	const user = await User.findOne({ _id: req.decode.userid }, '_id');

	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	return res.json({ code: 200, token: req.headers['x-access-token'] });
});

module.exports = router;