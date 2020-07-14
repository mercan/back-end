// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const router 	  = require('express').Router();
const mongoose  = require('mongoose');

// Models
const Event = require('../../models/Event');
const Like  = require('../../models/Like');


const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 80,
  headers: false
});

const deleteQuestion = async (
	res, ipAddress, questionIpAddress, decodeUserID, questionUserID,
	questionID, questionDeleted
) => {
	if (questionDeleted) {
		return res.status(400).json({ code: 4040 });
	}

	async function deleteQ(questionID) {
		const deleted = await Event.updateOne({ 'questions._id': questionID }, {
			$inc: { 
				'totalQuestion': -1
			},
			'questions.$.deleted': true,
			totalAnswers: 1
		});

		return deleted.nModified ?res.json({ code: 200 }) :
		res.status(304).json({ code: 304 });
	}

	// İlk başta var mı diye sorgulamamın nedeni false verdiğim için boş değerleri false == false olarak eşit olmasın diye.
	if (decodeUserID && questionUserID == decodeUserID) {
		return deleteQ(questionID);
	} else if (ipAddress && questionIpAddress === ipAddress) {
		return deleteQ(questionID);
	}
	
	return res.status(400).json({ code: '4043question' });
}


router.post('/user-delete-question', limiter, VerifyToken, async (req, res) => {
	const { questionID } = req.body;
 
	if (!questionID || !mongoose.Types.ObjectId.isValid(questionID)) {
		return res.status(400).json({ code: 400 });
	}

	const question = await Event.findOne(
		{ 
			'questions._id': questionID, deleteEvent: false 
		}, 
		{
			_id: 0, 'questions.$': 1
		}
	);
	
	if (!question) {
		return res.status(400).json({ code: 4040 });
	}

	const questionObj = question.questions[0];

	deleteQuestion(res, false, false, req.decode.userid, questionObj.userID, 
		questionID, questionObj.deleted);
});


router.post('/anonymous-delete-question', limiter, async (req, res) => {
	const { questionID } = req.body;

	if (!questionID || !mongoose.Types.ObjectId.isValid(questionID)) {
		return res.status(400).json({ code: 400 });
	}

	const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	const question = await Event.findOne(
		{ 
			'questions._id': questionID, deleteEvent: false
		},
		{
			_id: 0, 'questions.$': 1
		}
	);

	if (!question) {
		return res.status(400).json({ code: '4004question' });
	}

	const questionObj = question.questions[0];

	deleteQuestion(res, ipAddress, questionObj.ipAddress, false, false,
		questionID, questionObj.deleted);
});

module.exports = router;