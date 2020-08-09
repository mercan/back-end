// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const router = require('express').Router();
const mongoose = require('mongoose');

// Models
const Event = require('../../models/Event');

router.post('/creator-delete-question', VerifyToken, async (req, res) => {
	const { questionID } = req.body;

	if (!questionID || !mongoose.Types.ObjectId.isValid(questionID)) {
		return res.status(400).json({ code: 400 });
	}
	
	const event = await Event.findOne(
		{ 
			'creator.userID': req.decode.userid, 
			'questions._id': questionID, 
			deleteEvent: false
		},
		{
			_id: 0, 'questions.$': 1
		}
	);

	
	if (!event) {
		return res.status(400).json({ code: 4040 });
	}

	if (event.questions[0].deleted) {
		return res.status(400).json({ code: 4040 });	
	}
	
	const deleteQuestion = await Event.updateOne({ 'questions._id': questionID }, {
		$inc: { 
			'totalQuestion': -1 
		},
		'questions.$.deleted': true,
		totalAnswers: 1
	});

	return deleteQuestion.nModified ? res.json({ code: 200 }) : res.status(304).json({ code: 304 });
});

module.exports = router;