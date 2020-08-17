// Token
const tokenCheck = require('../../middleware/verify-token-func');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

// Models
const Block	= require('../../models/Blocks');
const Event = require('../../models/Event');
const Like = require('../../models/Like');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  headers: false,
});

router.get('/getQuestion', limiter, async (req, res) => {
	const { eventCode, skip } = req.query;

	if (!eventCode) {
		return res.status(400).json({
			code: 400,
			message: 'Event code cannot be empty.'
		});
	}
	
	const eventControl = await Event.findOne({ eventCode, deleteEvent: false }, 'lastDate');

	// Eventin son kullanma tarihi dolduysa eventi siliyorum.
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
					'questions._id': 1, 			 'questions.userID': 1,  'questions.name': 1,
					'questions.picture': 1, 	 'questions.question': 1, 
					'questions.totalLike': 1,  'questions.reply': 1,
					'questions.created_AtMoment': 1,
				}
			}
		]
	).skip(Number(skip ?? 0)).limit(10);


	if (!event) {
		return res.status(404).json({ code: 404, message: 'Event not found.' });
	}

	const ipAddress = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress;
	
	if (!event.length) {
		const eventData = await Event.findOne({ eventCode }, {
			eventName: 1,
			eventType: 1,
			totalQuestion: 1,
			totalJoinEvent: 1,
			totalAnswers: 1,
		});

		// Hiç soru bulunmuyor.
		return res.status(200).json({
			code: 200, 
			questions: [{
				eventName: eventData.eventName,
				eventType: eventData.eventType, 
				totalAnswers: eventData.totalAnswers,
				totalQuestion: eventData.totalQuestion,
				totalJoinEvent: eventData.totalJoinEvent,
			}],
			likes: []
		});
	}

	const tokenPayload = await tokenCheck(req.headers['x-access-token']);

	let likes;
	const returnQuestionsArray = [];

	returnQuestionsArray.push({
		eventName: event[0].eventName,
		eventType: event[0].eventType, 
		blockQuestions: 0,
		totalAnswers: event[0].totalAnswers,
		totalQuestion: event[0].totalQuestion, 
		totalJoinEvent: event[0].totalJoinEvent	
	});

	if (tokenPayload) {
		likes = await Like.findOne({ 
			userID: tokenPayload.userid, 'events.eventID': event[0]._id 
		},
			'events.$'
		);

		const user = await Block.findOne({ userID: tokenPayload.userid }, 'blocks');

		if (user.blocks.length) {
			
			let totalBlockQuestion = 0;
			for (let key of event) {

				const blockControl = user.blocks.some(user => {
					return key.questions.userID &&
						user.userID.toString() === key.questions.userID.toString() &&
						!user.showQuestions
				});

				if (!blockControl) {
					returnQuestionsArray.push({
						questionID: key.questions._id,
						name: key.questions.name,
						question: key.questions.question,
						picture: key.questions.picture,
						date: key.questions.created_AtMoment,
						totalLike: key.questions.totalLike,
						reply: key.questions.reply,
					});
				} else {
					totalBlockQuestion += 1;
				}

			}
		}

	} else {
		likes = await Like.findOne({
			ipAddress, 'events.eventID': event[0]._id 
		}, 
			'events.$'
		);
		
		for (let key of event) {
			returnQuestionsArray.push({
				questionID: key.questions._id,
				name: key.questions.name,
				question: key.questions.question,
				picture: key.questions.picture,
				date: key.questions.created_AtMoment,
				totalLike: key.questions.totalLike,
				reply: key.questions.reply,
			});
		}
	}

	returnQuestionsArray[0].blockQuestions = totalBlockQuestion;

	return res.status(200).json({ 
		code: 200,
		questions: returnQuestionsArray,
		likes: likes.events[0].likes ?? [],
	});
	// return res.status(200).json({ code: 200, response: returnQuestionsArray, likes: [], moderator: true/false });
});

module.exports = router;