// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const router = require('express').Router();
const mongoose = require('mongoose');

// Models
const Event = require('../../models/Event');
const User = require('../../models/User');

router.post('/all-banned-add', VerifyToken, async (req, res) => {
	const { userID, questionID } = req.body;
	
	if (
		!userID && !questionID || userID && !mongoose.Types.ObjectId.isValid(userID) || 
		questionID && !mongoose.Types.ObjectId.isValid(questionID)
	) {
		return res.status(400).json({
			code: 400
		});
	}

	if (userID) {
		var user = await User.findOne({ _id: req.decode.userid }, 'bannedUserID');
	} else {
		var user = await User.findOne({ _id: req.decode.userid }, 'bannedUserIP');
	}
	
	if (!user) {
		return res.status(400).code({
			code: 400,
			message: 'User not found.',
		});
	}

	if (userID) {
		const userControl = await User.findOne({ _id: userID }, 'name');

		if (!userControl) {
			return res.status(400).json({
				code: 400,
				message: 'User not found.',
			});
		}

		const banUserIDControl = user.bannedUserID.some(user => user.userID == userID);
	
		if (banUserIDControl) {
			return res.status(400).json({
				code: 400,
				message: 'User has been banned before.'
			});
		}

		const banUpdate = await User.updateOne({ _id: req.decode.userid }, {
			$push: {
				bannedUserID: {
					userID,
					name: userControl.name
				}
			}
		});

		// Banlanan kullanıcıyı kişinin oluşturduğu bütün eventlerden banlıyorum.
		if (banUpdate.nModified) {	
			const eventsBan = await Event.updateMany({ 'creator.userID': req.decode.userid }, {
				$push: {
					bannedUserID: {
						userID,
						name: userControl.name
					}
				}
			});

			if (eventsBan.nModified) {
				return res.status(200).json({
					code: 200,
					message: 'The user is banned from all their events and the events all you will create from banned',
				});
			}

			return res.status(400).json({
				code: -1,
				message: 'Something went wrong.'
			});
		}

	}
	
	
	const question = await Event.findOne({ 'questions._id': questionID }, {
		_id: 0, 'questions.$.ipAddress': 1
	});

	if (!question) {
		return res.status(400).json({
			code: 400,
			message: 'User not found.',
		});
	}

	const bannedUserIPControl = user.bannedUserIP.includes(question.questions[0].ipAddress);

	if (!bannedUserIPControl) {
		const banUpdate = await User.updateOne({ _id: req.decode.userid }, {
			$push: {
				bannedUserIP: question.questions[0].ipAddress
			}
		});

		if (banUpdate.nModified) {
			const eventsBan = await Event.updateMany({ 'creator.userID': req.decode.userid }, {
				$push: {
					bannedUserIP: question.questions[0].ipAddress
				}
			});

			if (eventsBan.nModified) {
				return res.status(200).json({
					code: 200,
					message: 'The user is banned from all their events and the events all you will create from banned',
				});
			}

			return res.status(500).json({
				code: -1,
				message: 'Something went wrong.',
			});
		}

	}

	return res.status(400).json({
		code: 400,
		message: 'User has been banned before.',
	});
});

module.exports = router;