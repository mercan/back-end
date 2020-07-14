const rateLimit = require('express-rate-limit');
const Event  		= require('../../models/Event');
const router 		= require('express').Router();

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 30,
  headers: false
});

router.get('/event-search', limiter, async (req, res) => {
	const { eventCode } = req.query;

	if (!eventCode || eventCode.length > 25 || eventCode.length < 3) {
		return res.status(400).json({ code: 400 });
	}

	const event = await Event.findOne({ eventCode, deleteEvent: false }, '_id');
	
	return !event ? 
		res.status(400).json({ code: 4041, message: 'Event not found' })
			: res.json({ code: 200 });
});


module.exports = router;