// Token
const VerifyToken = require('../../middleware/api-verify-token');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();
const mongoose = require('mongoose');

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 20,
	headers: false
});

// Models
const User = require('../../models/User');
const Follow = require('../../models/Follow');

router.post('/follow', limiter, VerifyToken, async (req, res) => {
	const { userID, type } = req.body; // Takip etmeye veya takipten çıkmaya çalıştığı kişi.
	const decodeUserID = req.decode.userid; // Kişinin Kendisi.
	 
	if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
		return res.status(400).json({ 
			code: 400,
			message: 'User id is empty or invalid.'
		});
	}

	if (!type || type !== 'Follow' && type !== 'Unfollow') {
		return res.status(400).json({ 
			code: 400,
			message: 'Type is empty or invalid.'
		});
	}

	if (userID.toString() === decodeUserID.toString()) {
		return res.status(400).json({ 
			code: 400,
			message: 'You cannot follow yourself.'
		});
	}

	const followUserCheck = await User.findOne({ _id: userID }, '_id');

	if (!followUserCheck) {
		return res.status(400).json({
			code: 400,
			message: 'The user you want to follow is not registered.'
		});
	}

	const userCheck = await User.findOne({ _id: decodeUserID }, '_id');

	if (!userCheck) {
		return res.status(400).json({ 
			code: 400,
			message: 'User not found.'
		});
	}

	const followUserControl = async function(userID, fName, followID) {
		const controlQuery = {
			userID,
		};
		
		controlQuery[arguments[1]] = followID;
	 
		const control = await Follow.findOne(controlQuery, '_id');
		return control ? true : false;
	}
	
	const followUserAdd = async function(
		userID,
		query,
		followName,
		followID,
		totalFollow,
		number,
	) {
		const updateQuery = {
			$inc: {},
		};

		updateQuery.$inc[arguments[4]] = number;
		updateQuery[arguments[1]] = {
			[arguments[2]]: {
				userID: followID
			}
		};

		console.log(updateQuery);

		const update = await Follow.updateOne({ userID }, updateQuery);

		return update.nModified ? true : false;
	}

	if (type === 'Follow') {
		const followControl = await followUserControl(
			decodeUserID,
			'following.userID',
			userID,
		);
		
		if (followControl) {
			return res.status(400).json({
				code: 400,
				message: 'You can\'t follow the same person again.' 
			});
		}

		const followingAdd = await followUserAdd(
			decodeUserID,
			'$push',
			'following',
			userID,
			'totalFollowing',
			1,
		);

		if (followingAdd) {
			const followersAdd = await followUserAdd(
				userID,
				'$push',
				'followers',
				decodeUserID,
				'totalFollowers',
				1,
			);

			return res.status(200).json({
				code: 200,
				message: 'You started to follow.'
			});
		}

		return res.status(400).json({ 
			code: -1,
			message: 'An error occurred, please try again later.'
		});
	
	} else if (type === 'Unfollow') {
		const followControl = await followUserControl(
			decodeUserID,
			'following.userID',
			userID,
		);

		if (followControl) {
			const unFollowing = await followUserAdd(
				decodeUserID,
				'$pull',
				'following',
				userID,
				'totalFollowing',
				-1,
			);

			if (unFollowing.nModified) {
				const unFollowers = await followUserAdd(
					userID,
					'$pull',
					'followers',
					decodeUserID,
					'totalFollowers',
					-1,
				);

				return res.status(200).json({ 
					code: 200,
					message: 'You stopped following the user.'
				});
			}

			return res.status(400).json({ 
				code: -1,
				message: 'An error occurred, please try again later.'
			});
		}

		return res.status(400).json({
			code: 400,
			message: 'You are not already following the user.'
		});
	}

});

module.exports = router;