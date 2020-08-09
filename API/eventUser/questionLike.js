// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

//  Models
const Event = require('../../models/Event');
const Like = require('../../models/Like');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 45,
  headers: false
});

const createUserLike = async ( userID, ipAddress, eventID, questionID ) => {
	if (!eventID || !questionID || !userID && !ipAddress) {
		return false;
	}

	let likeCreate;

	if (userID) {
		likeCreate = new Like({
			userID,
			events: {
				eventID,
				likes: questionID
			}
		}).save().then(() => true);

	} else {
		likeCreate = new Like({
			ipAddress,
			events: {
				eventID,
				likes: questionID
			}
		}).save().then(() => true);
	}

	if (likeCreate) {
		return await likeUpdate(questionID);
	}

	return { code: 304 };
}

const newLikeCreate = async ( userID, ipAddress, eventID, questionID ) => {
	let newEvent;

	if (userID) {
		newEvent = await Like.updateOne({ userID }, {
			$push: { 
				events: {
					eventID,
					likes: questionID
				}
			}
		});

	} else {
		newEvent = await Like.updateOne({ ipAddress }, {
			$push: { 
				events: {
					eventID,
					likes: questionID
				}
			}
		});
	}
	
	if (newEvent.nModified) {
		return await likeUpdate(questionID);
	}

	return { code: 304 };
}

const likeAddQuestion = async ( userID, ipAddress, eventID, questionID ) => {
	let likeAdd;

	if (userID) {
		likeAdd = await Like.updateOne({ userID, 'events.eventID': eventID }, {
			$push: {
				'events.$.likes': questionID
			}
		});

	} else {
		likeAdd = await Like.updateOne({ ipAddress, 'events.eventID': eventID }, {
			$push: {
				'events.$.likes': questionID
			}
		});

	}
	
	if (likeAdd.nModified) {
		return await likeUpdate(questionID);
	}

	return { code: 304 };
}

const likeUpdate = async ( questionID, number = 1 ) => {
	const data = await Event.updateOne({ 'questions._id': questionID }, {
		$inc: { 
			'questions.$.totalLike': number
		}
	});

	return data.nModified ? true : false;
}

const likeDeleteQuestion = async ( userID, ipAddress, eventID, questionID ) => {
	
	if (userID) {
		likeDelete = await Like.updateOne({ userID, 'events.eventID': eventID }, {
			$pull: {
				'events.$.likes': questionID
			}
		});

	} else {
		likeDelete = await Like.updateOne({ ipAddress, 'events.eventID': eventID }, {
			$pull: {
				'events.$.likes': questionID
			}
		});
	}
	
	if (likeDelete.nModified) {
		return await likeUpdate(questionID, -1);
	}

	return { code: 304 };
}


router.post('/like-question-user', limiter, VerifyToken, async (req, res) => {
	const { questionID } = req.body;
	const userID = req.decode.userid;

	if (!questionID) {
		return res.status(400).json({ code: 400 });
	}

	const event = await Event.findOne(
		{ 
			'questions._id': questionID, deleteEvent: false 
		}, 
		'questions.$'
	);

	if (!event || event.questions[0].deleted) {
		return res.status(400).json({ code: 4040 });
	}

	const controlUserID = await Like.findOne({ userID }, '_id');
	
	// Create new User Like
	if (!controlUserID) {
		if (await createUserLike(userID, false, event._id, questionID)) {
			return res.json({ code: 200 });
		}

		return res.status(304).json({ code: 304 });
	}

	const likes = await Like.findOne({ userID, 'events.eventID': event._id }, 'events.$');
	
	// new Like Create
	if (!likes) {
		if (await newLikeCreate(userID, false, event._id, questionID)) {
			return res.json({ code: 200 });
		}

		return res.status(304).json({ code: 304 });
	}
		
	if (!likes.events[0].likes.includes(questionID)) {
		if (await likeAddQuestion(userID, false, event._id, questionID)) {
			return res.json({ code: 200 });
		}

		return res.status(304).json({ code: 304 });
	} 

	// Unlike
	if (await likeDeleteQuestion(userID, false, event._id, questionID)) {
		return res.json({ code: 200 });
	}

	return res.status(304).json({ code: 304 });
});


router.post('/like-question-anonymous', limiter, async (req, res) => {
	const { questionID } = req.body;

	if (!questionID) {
		return res.status(400).json({ code: 400 });
	}

	const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	const event = await Event.findOne(
		{ 
			'questions._id': questionID, deleteEvent: false 
		},
		{
			_id: 1, 'features.loginLike': 1, 'questions.$': 1
		}
	);

	if (!event || event.questions[0].deleted) {
		return res.status(400).json({ code: 4040 });
	}

	if (event.features.loginLike) {
		return res.status(403).json({ code: 401 });
	}

	const controlUserID = await Like.findOne({ ipAddress }, '_id');
	
	// Create new Anonymous User Like
	if (!controlUserID) {
		if (await createUserLike(false, ipAddress, event._id, questionID)) {
			return res.json({ code: 200 });
		}

		return res.status(304).json({ code: 304 });
	}

	const likes = await Like.findOne({ ipAddress, 'events.eventID': event._id }, 'events.$');

	// new Like Create
	if (!likes) {
		if (await newLikeCreate(false, ipAddress, event._id, questionID)) {
			return res.json({ code: 200 });
		}

		return res.status(304).json({ code: 304 });
	}
		
	if (!likes.events[0].likes.includes(questionID)) {
		if (await likeAddQuestion(false, ipAddress, event._id, questionID)) {
			return res.json({ code: 200 });
		}

		return res.status(304).json({ code: 304 });

	} else {
		// Unlike
		const deleteQuestion = await likeDeleteQuestion(false, ipAddress,
			event._id, questionID);
		
		if (deleteQuestion) {
			return res.json({ code: 200 });
		}

		return res.status(304).json({ code: 304 });
	}

});

module.exports = router;