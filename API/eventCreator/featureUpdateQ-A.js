// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const router = require('express').Router();

// Models
const Event = require('../../models/Event');


router.post('/feature-update-q', VerifyToken, async (req, res) => {
	// Güncellenicek.
	const { eventCode } = req.body;

	if (!eventCode || !req.query) {
		return res.status(400).json({ code: 400 });
	}
	
	const event = await Event.findOne({ eventCode, deleteEvent: false },
		'features creator.userID'
	);
	
	if (!event) {
		return res.status(400).json({ code: 4041 });
	}

	const creatorCheck = event.creator.some(user => user.userID == req.decode.userid);

	// requestSendEmail ekle
	// Sadece bir kere true olsun mailleri göndersin ondan sonra bir daha mail gönderimi olmasın.

	if (creatorCheck) {
		const event = await Event.updateOne({ eventCode }, {	
			'features.bannedUserQuestion': req.query.bannedUserQuestion ||event.features.bannedUserQuestion,
			'features.totalQuestionLimit': req.query.totalQuestionLimit || event.features.totalQuestionLimit,
			'features.questionLimit': req.query.questionLimit || event.features.questionLimit,
			'features.loginQuestion': req.query.loginQuestion || event.features.loginQuestion,
			'features.loginLike': req.query.loginLike || event.features.loginLike,
			'features.question': req.query.question || event.features.question,
			'features.reply': req.query.reply || event.features.reply
		});

		return event.nModified ? res.json({ code: 200 }) : res.status(304).json({ code: 304 });
	}

	return res.status(403).json({ code: 403 });
});

module.exports = router;