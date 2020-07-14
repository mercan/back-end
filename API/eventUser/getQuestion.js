const tokenCheck = require('../../middleware/verify-token-func');

// Package
const rateLimit = require('express-rate-limit');
const router 		= require('express').Router();

// Models
const Block	= require('../../models/Blocks');
const Event = require('../../models/Event');
const Like  = require('../../models/Like');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});

router.get('/getQuestion', limiter, async (req, res) => {
	const { eventCode, skip } = req.query;

	if (!eventCode) {
		return res.status(400).json({ code: 400 });
	}
	
	const eventControl = await Event.findOne({ eventCode, deleteEvent: false }, 'lastDate');

	if (new Date() >= eventControl.lastDate) {
		const eventDelete = await Event.updateOne({ eventCode }, {
			deleteEvent: true
		});

		return res.status(400).json({ code: 4041 });
	}

	const event = await Event.aggregate(
		[	
			{
				$unwind: '$questions'
			},
			{
				$match: { eventCode, 'questions.deleted': false }
			},
			{
				$sort: { 'questions.totalLike': -1 }
			},
			{
				$project: { 
					eventName: 1, eventType: 1, totalQuestion: 1, totalJoinEvent: 1,
					totalAnswers: 1,
					'questions._id': 1, 			 'questions.userID': 1, 'questions.name': 1,
					'questions.picture': 1, 	 'questions.question': 1, 
					'questions.totalLike': 1, 'questions.reply': 1,
					'questions.created_AtMoment': 1,
				}
			}
		]
	).skip(Number(skip ?? 0)).limit(10);


	if (!event) {
		return res.status(404).json({ code: 404 });
	}

	const ipAddress = req.headers['x-forwarded-for'] ||
	req.connection.remoteAddress;
	
	if (event.length === 0) {
		const eventData = await Event.findOne({ eventCode }, {
			eventName: 1, eventType: 1, totalQuestion: 1, totalJoinEvent: 1,
			totalAnswers: 1
		});

		// Hiç soru bulunmuyor.
		return res.json(
			{ 
				code: 200, 
				response: [
					{ 
						eventName: eventData.eventName, eventType: eventData.eventType, 
						totalAnswers: eventData.totalAnswers,
						totalQuestion: eventData.totalQuestion,
						totalJoinEvent: eventData.totalJoinEvent,
					}
				],
				likes: [] 
			}
		);
	}

	const tokenPayload = await tokenCheck(req.headers['x-access-token']);


	if (tokenPayload) {
		var likes = await Like.findOne(
			{ 
				userID: tokenPayload.userid, 'events.eventID': event[0]._id 
			},
			'events.$'
		);

	} else {
		var likes = await Like.findOne(
			{ 
				ipAddress, 'events.eventID': event[0]._id 
			}, 
			'events.$'
		);
	}
	
	const returnQuestionsArray = [];

	returnQuestionsArray.push(
		{ 
			eventName: event[0].eventName, eventType: event[0].eventType, 
			blockQuestion: 0,
			totalAnswers: event[0].totalAnswers,
			totalQuestion: event[0].totalQuestion, 
			totalJoinEvent: event[0].totalJoinEvent
			
		}
	);

	if (tokenPayload) {
		const user = await Block.findOne({ userID: tokenPayload.userid }, 'blocks');

		if (user.blocks.length > 0) {
			
			var blockQuestion = 0; // Line : 153
			for (let key of event) {

				const blockControl = user.blocks.some(user => {
					return key.questions.userID &&
						user.userID.toString() === key.questions.userID.toString() &&
						!user.showQuestions
				});

				if (!blockControl) {
					returnQuestionsArray.push({
						questionID: key.questions._id,  name: key.questions.name,
						picture: key.questions.picture, question: key.questions.question,
						date: key.questions.created_AtMoment, totalLike: key.questions.totalLike,
						reply: key.questions.reply,     userID: key.questions.userID
					});
				} else {
					blockQuestion += 1;
				}

			}
		}

	} else {
		for (let key of event) {
			returnQuestionsArray.push({
				questionID: key.questions._id,  name: key.questions.name,
				picture: key.questions.picture, question: key.questions.question,
				date: key.questions.created_AtMoment, totalLike: key.questions.totalLike,
				reply: key.questions.reply,     userID: key.questions.userID
			});
		}
		
	}

	returnQuestionsArray[0].blockQuestion = blockQuestion;

	return res.status(200).json({ 
		code: 200, response: returnQuestionsArray,
		likes: likes ? likes.events[0].likes : []
	});
	// return res.status(200).json({ code: 200, response: returnQuestionsArray, likes: [], moderator: true/false });
});

module.exports = router;