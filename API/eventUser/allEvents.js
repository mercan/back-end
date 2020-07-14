const router = require('express').Router();
const Event  = require('../../models/Event');

router.get('/all-events', async (req, res) => {
	const events = await Event.find({ private: false, deleteEvent: false })
	.select({ 
		_id: 0, eventCode: 1, eventName: 1, eventType: 1, 'creator.name': 1,
		totalQuestion: 1, totalJoinedEvent: 1 
	});

	return res.json(events);
	// Baştan Yapılacak.
});


module.exports = router;
