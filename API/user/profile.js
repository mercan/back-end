// Token
const tokenVerify = require('../../middleware/verify-token-func');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();
const mongoose = require('mongoose');

// Models
const JoinEvent = require('../../models/JoinEvent');
const Follow = require('../../models/Follow');
const Block = require('../../models/Blocks');
const User = require('../../models/User');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 35,
  headers: false
});

const userFindAndReturnData = async function(res, query, data) {
	const	queryKey = Object.keys(query)[0];
	const	queryValue = Object.values(query)[0];

	if (res) {
		switch (queryKey) {
			case 'userID' || '_id':
				if (!mongoose.Types.ObjectId.isValid(queryValue)) {
					return res.status(400).json({
						code: 400,
						message: 'User id is invalid'
					});
				}
				break;

			case 'username':
				if (queryValue.length > 40 || queryValue.length < 3) {
					return res.status(400).json({
						code: 400,
						message: `${
							queryValue.length ? 'Username is invalid'
								: 'Username cannot be empty'
						}`
					});
				}
				break;
		}
	}
	

	const user = await User.findOne(query).select(data);

	if (res) {
		if (!user) {
			return res.status(400).json({ code: 400, message: 'User not found' });
		}

		return user;
	}

	return user ? user : { code: 400, message: 'User not found' };
}

router.post('/user_profile_info', limiter, async (req, res) => {
	const { username } = req.body;
	const token = req.headers['x-access-token'];

	const user = await userFindAndReturnData(res, { username }, {
		_id: 1,
		name: 1,
		picture: 1,
		premium: 1,
		verified: 1,
		hobbies: 1,
		'accounts.showAccounts': 1,
	});

	if (user.statusCode === 400) {
		return;
	}
	
	const follow = await Follow.findOne({ userID: user._id }).select({
		_id: 0,
		totalFollowers: 1,
		totalFollowing: 1,
		followers: 1,
	});

	const returnObj = {
		code: 200,
		name: 	 	user.name,
		picture: 	user.picture,
		premium: 	user.premium,
		verified: user.verified,
		hobbies: 	user.hobbies,
		showAccounts: user.accounts.showAccounts,
		followers: follow.totalFollowers,
		following: follow.totalFollowing,
	}
	
	if (token) {
		const userDecode = await tokenVerify(token);

		const userBlockControl = await Block.findOne({
			userID: user._id,
			'blocks.userID': userDecode.userid
		});

		if (userBlockControl) {
			return res.status(400).json({
				code: 400,
				message: 'You cannot see the profile because the user has blocked you'
			});
		}

		if (userDecode) {
			for (let key of follow.followers) {
				if (userDecode.userid.toString() === key.userID.toString()) {
					returnObj.follow = true;
					break;
				}
			}
		}
	}

	// Eğer follow.followers boş ise for of a giremeyeceği için böyle bir kontrol yapıyorum.
	if (!returnObj.follow) {
		returnObj.follow = false;
	}

	return res.status(200).json(returnObj);
});

module.exports = router;