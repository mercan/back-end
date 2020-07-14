const VerifyToken = require('../../middleware/api-verify-token');
const JoinEvent = require('../../models/JoinEvent');
const Event  = require('../../models/Event');
const User   = require('../../models/User');
const router = require('express').Router();


const eventJoinedEvent = async eventCode => {
	const joinEventUpdate = await Event.updateOne({ eventCode }, {
		$inc: {
			totalJoinedEvent: 1
		}
	});

	return joinEventUpdate.nModified ? true : false;
}

router.post('/join-event-add', VerifyToken, async (req, res) => {
	const { eventCode } = req.body;
 
	if (!eventCode) {
		return res.status(400).json({ code: 400 });
	}
		
	const eventControl = await Event.findOne({ eventCode, deleteEvent: false }, '_id');

	if (!eventControl)	{
		return res.status(400).json({ code: 4041 });
	}

	const userControl = await User.findOne({ _id: req.decode.userid }, '_id');

	if (!userControl) {
		return res.status(400).json({ code: 4042 });
	}

	const event = await JoinEvent.findOne({ userID: req.decode.userid }, {
		joinEvents: 1
	});

	if (!event) {
		const newJoinEvent = new JoinEvent({
			userID: req.decode.userid,
			totalJoinEvent: 1,
			joinEvents: {
				eventID: eventControl._id
			}
		});

		const saved = newJoinEvent.save() ? true : false;

		if (saved) {
			return eventJoinedEvent(eventCode) ? res.json({ code: 200 }) : 
			res.status(304).json({ code: 304 });
		}

		return res.status(304).json({ code: 304 });
	}

	for (const key of event.joinEvents) {
		if (key.eventID.toString() === eventControl._id.toString()) {
			return res.status(400).json({ code: 4043 });
		}
	} 

	const joinEvent = await JoinEvent.updateOne({ userID: req.decode.userid }, {
		$inc: {
			totalJoinEvent: 1
		},
		$push: {
			joinEvents: {
				eventID: eventControl._id
			}
		}
	});

	if (joinEvent.nModified) {
		return eventJoinedEvent(eventCode) ? res.json({ code: 200 }) : 
		res.status(304).json({ code: 304 });
	}

	res.status(304).json({ code: 304 });
});

module.exports = router;