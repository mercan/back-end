const VerifyToken = require('../../middleware/api-verify-token');
const rateLimit   = require('express-rate-limit');
const Event  			= require('../../models/Event');
const User   			= require('../../models/User');
const router 			= require('express').Router();

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
	const [ eventCode, question ] = [ 
		req.body.eventCode,
		req.body.question ? req.body.question.trim() : undefined 
	];

	if (
		!eventCode || !question &&
		eventCode && eventCode.length > 25 || eventCode.length < 3 &&
		question && question.length > 160 || question.length < 8
	) {
		return res.status(400).json({ code: 400 });
	}

	const event = await Event.findOne(
		{ 
			eventCode: eventCode, deleteEvent: false 
		},
		{
			totalQuestion: 1, features: 1, bannedUserID: 1
		}
		
	);
	
	if (!event) {
		return res.status(400).json({ code: 400 });
	}

	if (!event.features.question) {
		return res.status(400).json({ code: -99 });
	}

	if (event.features.totalQuestionLimit !== -1 &&
		event.features.totalQuestionLimit <= event.totalQuestion) {
		return res.status(400).json({ code: -99 });
	}

	const user = await User.findOne({ _id: req.decode.userid }, 'name picture');

	if (!user) {
		return res.status(401).json({ code: 401 });
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
	const { eventCode, question } = req.body;

	if (
		!eventCode || !question &&
		eventCode && eventCode.length > 25 || eventCode.length < 3 &&
		question && question.length > 160 || question.length < 8
	) {
		return res.status(400).json({ code: 400 });
	}
	

	const event = await Event.findOne(
		{ 
			eventCode, deleteEvent: false 
		}, 
		'totalQuestion features bannedUserIP'
	);

	const ipAddress = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress;

	if (!event) {
		return res.status(400).json({ code: 400 });
	}

	if (!event.features.question) {
		return res.status(400).json({ code: -99 });
	}

	if (event.features.loginQuestion) {
		return res.status(403).json({ code: '4004question' });
	}
	
	if (
		event.features.totalQuestionLimit !== -1 &&
		event.features.totalQuestionLimit <= event.totalQuestion
	) {
		return res.status(400).json({ code: -99 });
	}

	if (event.bannedUserIP.includes(ipAddress)) {
		return res.status(400).json({ code: -990 });
	}

	if (await createQuestion(eventCode, false, ipAddress, question)) {
		return res.json({ code: 200 });
	}

	return res.status(400).json({ code: 400 });
});

module.exports = router;