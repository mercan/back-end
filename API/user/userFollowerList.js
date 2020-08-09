// Token
const tokenCheck = require('../../middleware/verify-token-func');

// Package
const rateLimit = require('express-rate-limit');
const router = require('express').Router();

// Models
const Follow = require('../../models/Follow');
const Block = require('../../models/Blocks');
const User = require('../../models/User');

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 25,
	headers: false
});

const userControl = async function(username, res) {
	const user = await User.findOne({ username }, '_id');

	return user ? user : false;
}

const userInfoFunc = async function(_id) {
	return await User.findOne({ _id }).select({
		_id: 0, name: 1, username: 1, picture: 1, verified: 1
	});
}

const userFollowerControl = async function(followerUserID, userID) {
	const unfollow = [], followers = [];

	const user = await Follow.findOne({ userID: followerUserID }, 'followers.userID');
	const userFollowing = await Follow.findOne({ userID }, 'following.userID'); // Benim takip ettiğim kişiler.

	for (let key of user.followers) {
		const userInfo = await userInfoFunc(key.userID);
			
		if (key.userID.toString() === userID.toString()) {
			unfollow.push({
				name: userInfo.name,
				username: userInfo.username,
				picture: userInfo.picture,
				verified: userInfo.verified,
				profileURL: `https://urlgelicek.io/u/${userInfo.username}`,
				me: true
			});

			continue;
		}

		for (let follow of userFollowing.following) {
			if (key.userID == follow.userID && key.userID.toString() !== userID.toString()) {
				unfollow.push({
					name: userInfo.name,
					username: userInfo.username,
					picture: userInfo.picture,
					verified: userInfo.verified,
					profileURL: `https://urlgelicek.io/u/${userInfo.username}`,
					follow: true
				});	
			}
		}
			
		followers.push({
			name: userInfo.name,
			username: userInfo.username,
			picture: userInfo.picture,
			verified: userInfo.verified,
			profileURL: `https://urlgelicek.io/u/${userInfo.username}`,
			follow: false
		});
	}

	return [...unfollow, ...followers];
}

router.get('/user_follow_list', limiter, async (req, res) => {
	const { username } = req.query;

	if (!username || username.length > 40 || username.length < 3) {
		return res.status(400).json({
			code: 400,
			message: 'Username is empty or invalid.'
		});
	}

	const user = await userControl(username, res);

	if (!user) {
		return res.status(400).json({
			code: 400,
			message: 'Username not registered.'
		});
	}

	const userFollowers = await Follow.findOne({ userID: user._id }, 'followers.userID');

	if (!userFollowers.followers.length) { // === 0
		return res.status(200).json({
			code: 200,
			followers: []
		});
	}

	const token = req.headers['x-access-token'];

	if (token) {
		const tokenPayload = await tokenCheck(token);

		if (tokenPayload) {
			const userBlocks = await Block.findOne({ userID: user._id }, 'blocks');

			for (let user of userBlocks.blocks) {
				if (user.userID == tokenPayload.userid) {
					return res.status(400).json({
						code: 400,
						message: `You can't see the people ${username} followed.`
					});
				}
			}

			const returnFollowers = await userFollowerControl(user._id, tokenPayload.userid);

			return res.status(200).json({
				code: 200,
				followers: returnFollowers
			});
		}	
	}

	const followers = [];

	for (let key of userFollowers.followers) {
		const userInfo = await userInfoFunc(key.userID);

		followers.push({
			name: userInfo.name,
			username: userInfo.username,
			picture: userInfo.picture,
			verified: userInfo.verified,
			profileURL: `https://urlgelicek.io/u/${userInfo.username}`,
			follow: false
		})
	}

	return res.status(200).json({
		code: 200,
		followers
	})

});

module.exports = router;