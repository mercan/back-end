// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const typeList = require('./typeList').list;
const router = require('express').Router();

// Models
const Event = require('../../models/Event');
const User = require('../../models/User');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  headers: false
});


const randomEventCode = number => {
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

Date.prototype.addDays = days => {
  const date = new Date();
  return date.setDate(date.getDate() + days);
}

router.post('/create-event', limiter, VerifyToken, async (req, res) => {	
	const [ name, type ] = [
	
		req.body.name ? req.body.name.trim() : false,
		req.body.type ? req.body.type.trim() : false
	];
	

	if (
		!name || !type || name.length > 30 || name.length < 3 ||
		!typeList.includes(type)
	) {
		return res.status(400).json({ code: 400 });
	} 
		
	const user = await User.findOne({ _id: req.decode.userid },  {
		_id: 1, name: 1, email: 1, picture: 1, premium: 1,
		bannedUserID: 1, bannedUserIP: 1
	});
	
	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	const newEvent = new Event({
		eventCode: randomEventCode(8),
		eventName: name,
		eventType: type,
		premium: user.premium,
		creator: {
			userID:  user._id,
			name: 	 user.name,
			email: 	 user.email || null,
			picture: user.picture || null,
			owner: true
		},
		bannedUserID: user.bannedUserID,
		bannedUserIP: user.bannedUserIP
	});
	

	if (!newEvent.premium) {
		newEvent.lastDate = new Date().addDays(30);
	}

	const save = await newEvent.save().then(() => true).catch(() => false);

	const controlEventCode = async boolean => {
		if (boolean) {
			newEvent.eventCode = randomEventCode(8);
		}

		return await newEvent.save().then(() => true).catch(() => false);
	}

	if (save !== true) {
		while (true) {
			const control = await controlEventCode(true);

			if (control) {
				break;	
			}

		}
	}

	return res.status(200).json({ code: 200, eventcode: newEvent.eventCode });
});


module.exports = router;