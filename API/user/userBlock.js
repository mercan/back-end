// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const router    = require('express').Router();
const mongoose  = require('mongoose');

// Models
const Follow = require('../../models/Follow');
const Block = require('../../models/Blocks');
const User = require('../../models/User');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 35,
  headers: false
});

router.post('/add_block', limiter, VerifyToken, async (req, res) => {
	const { userID, showQuestions = false, infoMessage = '' } = req.body;

	if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
		return res.status(400).json({
			code: 400, 
			message: 'Userid is empty or invalid'	
		});
	}

	const user = await User.findOne({ _id: req.decode.userid }, '_id');

	if (!user) {
		return res.status(401).json({ code: 400, message: 'Can\'t find user' });
	}

	if (req.decode.userid.toString() === userID.toString()) {
		return res.status(400).json({	 
			code: 400,
			message: 'You can\'t block yourself'
		});
	}

	const currentUser = await Block.findOne({ userID: req.decode.userid }, 'blocks');

	if (!currentUser) {
		const newBlock = new Block({
			userID: req.decode.userid,
			blocks: {
				userID,
				showQuestions,
			}
		});

		if (infoMessage.length <= 60) {
			newBlock.blocks[0].infoMessage = infoMessage;
		}

		const saveNewBlock = await newBlock.save();

		return res.status(200).json({ code: 200, message: 'User blocked' });
	}

	for (let user of currentUser.blocks) {
		if (user.userID.toString() === userID.toString()) {
			return res.status(400).json({ 
				code: 400, 
				message: 'User previously blocked' 
			});
		}
	}

	const updateObj = {
		$push: {
			blocks: {
				userID,
				showQuestions,
				infoMessage: infoMessage.length > 60 ? '' : infoMessage,
			}
		}
	}

	// Değiştirilebilir.
	if (updateObj.$push.blocks.infoMessage.length === 0) {
		delete updateObj.$push.blocks.infoMessage;
	}

	const addBlock = await Block.updateOne({ userID: req.decode.userid }, updateObj);

	if (addBlock.nModified) {
		return res.status(200).json({ code: 200, message: 'User blocked' });
	}

	return res.status(400).json({ code: -1, message: 'Unknown error occurred' });
});

router.post('/delete_block', limiter, VerifyToken, async (req, res) => {
	const { unBlockUserID } = req.body;
	const userID = req.decode.userid;

	if (!unBlockUserID || !mongoose.Types.ObjectId.isValid(unBlockUserID)) {
		return res.status(400).json({
			code: 400,
			message: 'UnBlockUserID is empty or invalid'	
		});
	}

	const user = await User.findOne({ _id: userID }, '_id');

	if (!user) {
		return res.status(401).json({ code: 4042, message: 'Can\'t find user' });
	}

	const blockUserDelete = await Block.updateOne({ userID }, {
		$pull: {
			blocks: {
				userID: unBlockUserID
			}
		}
	});

	if (blockUserDelete.nModified) {
		return res.status(200).json({ code: 200, message: 'User unblocked' });
	}

	return res.status(400).json(
		{ 
			code: 400,
			message: 'No blocked user found' 
		}
	);
	
});

router.get('/get_blocks', limiter, VerifyToken, async (req, res) => {
	const userID = req.decode.userid;
	const { skip = 0 } = req.query;
			
	const user = await User.findOne({ _id: userID }, '_id');

	if (!user) {
		return res.status(401).json({ code: 400, message: 'Can\'t find user' });
	}

	const blockList = await Block.findOne({ userID }, {
		blocks: { $slice: [Number(skip), 10] }
	});

	return res.status(200).json({ code: 200, blocks: blockList.blocks ?? [] });
});
module.exports = router;