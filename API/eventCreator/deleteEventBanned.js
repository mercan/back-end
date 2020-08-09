// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const router = require('express').Router();
const mongoose = require('mongoose');

// Models
const Event = require('../../models/Event');


router.post('/event-banned-delete', VerifyToken, async (req, res) => {
	const { eventCode, userID } = req.body;
	
	if (!eventCode || userID && !mongoose.Types.ObjectId.isValid(userID)) {
		return res.status(400).json({ code: 400 });
	}

	const event = await Event.findOne({ eventCode }, 'bannedUserID creator');

	if (!event) {
		return res.status(400).json({ code: 4041 });
	}

	const creator = event.creator.some(user => user.userID == req.decode.userid);

	if (!creator) {
		return res.status(400).json({ code: 4005 });
	}

	if (!event.bannedUserID.some(user => user.userID == userID)) {
		return res.status(400).json({ code: 'ban404' });
	}

	const deleteBan = await Event.updateOne({ eventCode }, {
		$pull: {
			bannedUserID: {
				userID
			}
		}
	});

	return deleteBan.nModified ? res.json({ code: 200 }) : res.status(304).json({ code: 304 });
});

module.exports = router;