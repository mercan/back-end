// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

// Models
const Event = require('../../models/Event');
const User = require('../../models/User');

// Validation
const { createQuestionSchema } = require('../../validation/events/event.schema');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 35,
  headers: false
});

const totalQuestionUpdate = async eventCode => {
	const totalQuestion = await Event.updateOne({ eventCode }, { 
		$inc: { 
			totalQuestion: 1
		}
	});

	return totalQuestion.nModified ? true : false;
}


const createQuestion = async (eventCode, user, ipAddress, question) => {
	let create;

	if (user) {
		create = await Event.updateOne({ eventCode }, {
			$push: { 
				questions: {
					userID: user._id, 
					name:  user.name,
					picture: user.picture,
					question
				}
			}
		});

	} else {
		create = await Event.updateOne({ eventCode }, {
			$push: { 
				questions: {
					ipAddress,
					name:  'Anonymous',
					picture: 'https://www.booksie.com/files/profiles/22/mr-anonymous.png',
					question
				}
			}
		});
	}
	
	return create.nModified ? totalQuestionUpdate(eventCode) : false;
}

router.post('/create-question-user', limiter, VerifyToken, async (req, res) => {
	const validation = await createQuestionSchema.validate(req.body);

	if (validation.error) {
		return res.status(400).json({
			code: 400,
			message: validation.error.details[0].message,
		});
	}

	const { eventCode, question } = validation.value;

	const event = await Event.findOne(
		{ 
			eventCode: eventCode, deleteEvent: false 
		},
		{
			totalQuestion: 1, features: 1, bannedUserID: 1	
		}
	);
	
	if (!event) {
		return res.status(400).json({code: 400, message: 'Event not found.' });
	}

	if (!event.features.question) {
		return res.status(400).json({
			code: 400,
			message: 'The feature to ask questions to the event has been turned off.'
		});
	}

	if (
		event.features.totalQuestionLimit !== -1 &&
		event.features.totalQuestionLimit <= event.totalQuestion
	) {
		return res.status(400).json({
			code: 400,
			message: 'The limit for asking questions to the event is over.'
		});
	}

	const user = await User.findOne({ _id: req.decode.userid }, 'name picture');

	if (!user) {
		return res.status(400).json({
			code: 400,
			message: 'User not found.'
		});
	}

	const banControl = 
		event.bannedUserID.some(user => user.userID == req.decode.userid);

	if (banControl) {
		return res.status(400).json({ code: -990 });
	}

	if (await createQuestion(eventCode, user, false, question)) {
		return res.json({ code: 200 });
	}

	return res.status(400).json({ code: 400 });
});


router.post('/create-question-anonymous', limiter, async (req, res) => {
	const validation = await createQuestionSchema.validate(req.body);

	if (validation.error) {
		return res.status(400).json({
			code: 400,
			message: validation.error.details[0].message,
		});
	}

	const { eventCode, question } = validation.value;

	const event = await Event.findOne(
		{ 
			eventCode, deleteEvent: false 
		}, 
		'totalQuestion features bannedUserIP'
	);

	const ipAddress = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress;

	if (!event) {
		return res.status(400).json({code: 400, message: 'Event not found.' });
	}

	if (!event.features.question) {
		return res.status(400).json({
			code: 400,
			message: 'The feature to ask questions to the event has been turned off.'
		});
	}

	if (event.features.loginQuestion) {
		return res.status(400).json({
			code: 400,
			message: 'You must be logged in to ask questions to the event.'
		});
	}
	
	if (
		event.features.totalQuestionLimit !== -1 &&
		event.features.totalQuestionLimit <= event.totalQuestion
	) {
		return res.status(400).json({
			code: 400,
			message: 'The limit for asking questions to the event is over.'
		});
	}

	if (event.bannedUserIP.includes(ipAddress)) {
		return res.status(400).json({
			code: 400,
			message: 'You cannot ask questions because you are banned from the event.'
		});
	}

	if (await createQuestion(eventCode, false, ipAddress, question)) {
		return res.json({ code: 200 });
	}

});

module.exports = router;