// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

// Models
const JoinEvent = require('../../models/JoinEvent');
const Event = require('../../models/Event');
const User = require('../../models/User');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  headers: false
});

const eventJoinEvent = async eventCode => {
	const joinEventUpdate = await Event.updateOne({ eventCode }, {
		$inc: {
			totalJoinEvent: 1
		}
	});

	return joinEventUpdate.nModified ? true : false;
}

router.post('/add_join_event', limiter, VerifyToken, async (req, res) => {
	const { eventCode } = req.body;
	const userID = req.decode.userid;
 
	if (!eventCode) {
		return res.status(400).json({ code: 400 });
	}
		
	const eventControl = await Event.findOne({ eventCode, deleteEvent: false }, {
		_id: 1, eventType: 1
	});

	if (!eventControl)	{
		return res.status(400).json({ code: 4041 });
	}

	const userControl = await User.findOne({ _id: userID }, '_id');

	if (!userControl) {
		return res.status(400).json({ code: 4042 });
	}

	const event = await JoinEvent.findOne({ userID }, {
		joinEvents: 1
	});

	if (!event) {
		const newJoinEvent = new JoinEvent({
			userID,
			totalJoinEvent: 1,
			joinEvents: {
				eventID: eventControl._id,
				eventType: eventControl.eventType
			}
		}).save().then(() => true).catch(() => false);


		if (newJoinEvent) {
			return eventJoinEvent(eventCode) ? res.json({ code: 200 }) : 
			res.status(304).json({ code: 304 });
		}

		return res.status(304).json({ code: 304 });
	}

	for (const key of event.joinEvents) {
		if (key.eventID.toString() === eventControl._id.toString()) {
			return res.status(400).json({ code: 4043 });
		}
	} 

	const joinEvent = await JoinEvent.updateOne({ userID }, {
		$inc: {
			totalJoinEvent: 1
		},
		$push: {
			joinEvents: {
				eventID: eventControl._id,
				eventType: eventControl.eventType
			}
		}
	});

	if (joinEvent.nModified) {
		return eventJoinEvent(eventCode) ? res.json({ code: 200 }) : 
		res.status(304).json({ code: 304 });
	}

	res.status(304).json({ code: 304 });
});

module.exports = router;