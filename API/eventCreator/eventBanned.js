// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const router   = require('express').Router();
const mongoose = require('mongoose');


// Models
const Event = require('../../models/Event');
const User  = require('../../models/User');

router.post('/event-banned-add', VerifyToken, async (req, res) => {
	const { eventCode, userID, questionID } = req.body;

	if (
		!eventCode || !userID && questionID ||
		userID && !mongoose.Types.ObjectId.isValid(userID) ||
		questionID && !mongoose.Types.ObjectId.isValid(questionID)
	) {
		return res.status(400).json({ code: 400 });
	}
	

	if (userID) {

		var event = await Event.findOne({ eventCode, deleteEvent: false }, 
			'bannedUserID creator'
		);

	} else {

		var event = await Event.findOne(
			{ eventCode, 'questions._id': questionID, deleteEvent: false }, 
			'bannedUserIP creator questions.$'
		);

	}
	
	if (!event) {
		return res.status(400).json({ code: 4041 });
	}

	const creator = event.creator.some(user => user.userID == req.decode.userid);

	if (!creator) {
		return res.status(400).json({ code: 4005 });
	}


	if (userID) {
		const creatorBan = event.creator.some(user => user.userID == userID);

		if (creatorBan) {
			return res.status(400).json({ code: 'ban401' });
		}

		const banned = event.bannedUserID.some(user => user.userID == userID);

		if (banned) {
			return res.status(400).json({ code: 'ban400' });
		}

		const user = await User.findOne({ _id: userID }, 'name');

		if (!user) {
			return res.status(400).json({ code: 4042 });
		}

		const updateControl = await Event.updateOne({ eventCode }, {
			$push: {
				bannedUserID: {
					userID,
					name: user.name
				}
			}	
		});

		return updateControl.nModified ? res.json({ code: 200 })
			: res.status(304).json({ code: 304 });
	}


	const bannedUserIPControl = event.bannedUserIP.includes(event.questions[0].ipAddress);

	if (bannedUserIPControl) {
		return res.status(400).json({ code: 'ban400' });
	}

	const updateControl = await Event.updateOne({ eventCode }, {	
		$push: { 
			bannedUserIP: event.questions[0].ipAddress
		}
	});

	return updateControl.nModified ? res.json({ code: 200 })
		: res.status(304).json({ code: 304 });
});

module.exports = router;