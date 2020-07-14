const VerifyToken = require('../../middleware/api-verify-token');
const Event       = require('../../models/Event');
const User        = require('../../models/User');
const router      = require('express').Router();
const mongoose    = require('mongoose');


router.post('/all-banned-add', VerifyToken, async (req, res) => {
	const { userID, questionID } = req.body;
	
	if (!userID && !questionID || userID && !mongoose.Types.ObjectId.isValid(userID) 
		|| questionID && !mongoose.Types.ObjectId.isValid(questionID)) {
		return res.status(400).json({ code: 400 });
	}

	let user;

	if (userID) {
		user = await User.findOne({ _id: req.decode.userid }, 'bannedUserID');
	} else {
		user = await User.findOne({ _id: req.decode.userid }, 'bannedUserIP');
	}
	
	if (!user) {
		return res.status(400).code({ code: 4042 });
	}

	if (userID) {
		const userControl = await User.findOne({ _id: userID }, 'name');

		if (!userControl) {
			return res.status(400).json({ code: 4042 });
		}

		const banUserIDControl = user.bannedUserID.some(user => user.userID == userID);
	
		if (banUserIDControl) {
			return res.status(400).json({ code: 'ban400' });
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

			return eventsBan.nModified ? res.json({ code: 200 }) : res.status(304).json({ code: 304 });
		}

		return res.status(304).json({ code: 304 });
	}
	
	
	const question = await Event.findOne({ 'questions._id': questionID }, {
		_id: 0, 'questions.$.ipAddress': 1
	});

	if (!question) {
		return res.status(400).json({ code: 4042 });
	}

	const bannedUserIPControl = user.bannedUserIP.includes(question.questions[0].ipAddress);

	if (!bannedUserIPControl) {
		const banUpdate = await User.updateOne({ _id: req.decode.userid }, {
			$push: {
				bannedUserIP: question.questions[0].ipAddress
			}
		});

		if (banUpdate.nModified) {
			const eventsBan =  await Event.updateMany({ 'creator.userID': req.decode.userid }, {
				$push: {
					bannedUserIP: question.questions[0].ipAddress
				}
			});

			return eventsBan.nModified ? res.json({ code: 200 }) : res.status(304).json({ code: 304 });
		}

		return res.status(304).json({ code: 304 });
	}

	return res.status(400).json({ code: 'ban400' });
});









module.exports = router;