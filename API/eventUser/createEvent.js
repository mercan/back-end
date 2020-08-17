// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const typeList = require('./typeList').list;
const router = require('express').Router();

// Models
const Event = require('../../models/Event');
const User = require('../../models/User');

// Validation
const { createEventSchema } = require('../../validation/events/event.schema');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  headers: false
});

const randomEventCode = number => {
	const randomArray = [
		0, 'A', 1,  'B', 'C', 3, 'D', 4, 'J', 5, 6, 'K', 7, 8, 9, 'Q', 'W', 'E', 2, 
	 'R', 3, 'T', 'Y', 8, 4, 5, 6, 'U', 'I', 'O', 'P', 8 , 9, 'A', 'S', 'D', 4, 4,
	  9, 'F', 'G', 'H', 'J', 'K', 'L', 0, 'Z', 'X', 'C', 9, 5, 'V', 'B', 0, 'N', 6,
	  'M', 4, 6, 'M', 'D', 'E', 'I', 'J', 'K', 'L', 'U', 3, 6, 3,  'T', 'E', 'I', 8
	];

	let randomCode = '';

	for (let i = 0; i < number; i++) {
		const random = Math.floor(Math.random() * (randomArray.length - 1));
		randomCode += randomArray[random];
	}

	return randomCode;
};

async function eventCodeCheck(eventCode) {
	return await Event.findOne({ eventCode }, '_id');
}

Date.prototype.addDays = days => {
  const date = new Date();
  return date.setDate(date.getDate() + days);
}

router.post('/create_event', limiter, VerifyToken, async (req, res) => {	
	const validation = await createEventSchema.validate(req.body);
	
	if (validation.error) {
		return res.status(400).json({
			code: 400,
			message: validation.error.details[0].message,
		});
	}

	const { name, type } = validation.value;

	if (!typeList.includes(type)) {
		return res.status(400).json({
			code: 400,
			message: `The ${type} event type is not available.`
		})
	}
	 
	const user = await User.findOne({ _id: req.decode.userid },  {
		_id: 1, name: 1, email: 1, picture: 1, premium: 1,
		bannedUserID: 1, bannedUserIP: 1
	});
	
	if (!user) {
		return res.status(400).json({
			code: 400,
			message: 'User not found.'
		});
	}

	let eventCode = randomEventCode(8);

	while (true) {
		if (await eventCodeCheck(eventCode)) {
			eventCode = randomEventCode(8);
		} else {
			break;
		}
	}
	
	const newEvent = new Event({
		eventCode,
		eventName: name,
		eventType: type,
		premium: user.premium,
		creator: {
			userID:  user._id,
			name: 	 user.name,
			email: 	 user.email ?? null,
			picture: user.picture ?? null,
			owner: true
		},
		bannedUserID: user.bannedUserID,
		bannedUserIP: user.bannedUserIP
	});
	
	// Event oluşturulan hesap premium değilse event de premium olmayacağı için 30 gün sonra eventi silinmek üzere ayarlıyorum.
	if (!newEvent.premium) {
		newEvent.lastDate = new Date().addDays(30);
	}

	await newEvent.save();

	return res.status(200).json({
		code: 200,
		eventcode: newEvent.eventCode
	});
});

module.exports = router;