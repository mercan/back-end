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

const userControl = async function(username) {
	const user = await User.findOne({ username }, '_id');
	return user ? user : false;
}

const userInfoFunc = async function(_id) {
	return await User.findOne({ _id }).select({
		_id: 0, name: 1, username: 1, picture: 1, verified: 1
	});
}

const userFollowControl = async function(followUserID, userID, followUserData, meData) {
	const unfollow = [], followers = [];

	const user = await Follow.findOne({ userID: followUserID }, followUserData);
	// Benim takip ettiğim kişiler.
	const userFollow = await Follow.findOne({ userID }, meData);

	for (let key of user.followers ?? user.following) {
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

		for (let follow of userFollow.followers ?? userFollow.following) {
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


router.get('/user_follower_list', limiter, async (req, res) => {
	const { username } = req.query;

	if (!username || username.length > 40 || username.length < 3) {
		return res.status(400).json({
			code: 400,
			message: 'Username is empty or invalid.'
		});
	}

	const user = await userControl(username);

	if (!user) {
		return res.status(400).json({
			code: 400,
			message: 'Username not registered.'
		});
	}

	const token = req.headers['x-access-token'];

	// Token varsa verileri isteyen kişi token doğruysa giriş yapmış demektir.
	if (token) {
		// Token Doğru mu ?
		const tokenPayload = await tokenCheck(token);

		if (tokenPayload) {
			// Kullanıcı veriyi isteyen kişiyi engellemiş mi ?
			const userBlocks = await Block.findOne({ userID: user._id }, 'blocks');

			// Eğer kişi kimseyi engellememiş ise null verip hataya sebep oluyor.
			if (userBlocks) {
				for (let user of userBlocks.blocks) {
					if (user.userID == tokenPayload.userid) {
						return res.status(400).json({
							code: 400,
							message: `You can't see the people ${username} followed.`
						});
					}
				}
			}
			
			const returnFollowers = await userFollowControl(user._id, tokenPayload.userid, 'followers.userID', 'following.userID');

			return res.status(200).json({
				code: 200,
				followers: returnFollowers
			});
		}	
	}

	const userFollowers = await Follow.findOne({ userID: user._id }, 'followers.userID');

	if (!userFollowers.followers.length) {
		return res.status(200).json({
			code: 200,
			followers: []
		});
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
	});

});

router.get('/user_following_list', limiter, async (req, res) => {
	const { username } = req.query;

	if (!username || username.length > 40 || username.length < 3) {
		return res.status(400).json({
			code: 400,
			message: 'Username is empty or invalid.'
		});
	}

	const user = await userControl(username);

	if (!user) {
		return res.status(400).json({
			code: 400,
			message: 'Username not registered.'
		});
	}

	const token = req.headers['x-access-token'];

	// Token varsa verileri isteyen kişi token doğruysa giriş yapmış demektir.
	if (token) {
		// Token Doğru mu ?
		const tokenPayload = await tokenCheck(token);

		if (tokenPayload) {
			// Kullanıcı veriyi isteyen kişiyi engellemiş mi ?
			const userBlocks = await Block.findOne({ userID: user._id }, 'blocks');

			// Eğer kişi kimseyi engellememiş ise null verip hataya sebep oluyor.
			if (userBlocks) {
				for (let user of userBlocks.blocks) {
					if (user.userID == tokenPayload.userid) {
						return res.status(400).json({
							code: 400,
							message: `You can't see the people ${username} followed.`
						});
					}
				}
			}
			
			const returnFollowing = await userFollowControl(user._id, tokenPayload.userid, 'following.userID', 'followers.userID');

			return res.status(200).json({
				code: 200,
				following: returnFollowing
			});
		}	
	}


	const userFollowing = await Follow.findOne({ userID: user._id }, 'following.userID');

	if (!userFollowing.following.length) {
		return res.status(200).json({
			code: 200,
			following: []
		});
	}

	const following = [];

	for (let key of userFollowing.following) {
		const userInfo = await userInfoFunc(key.userID);

		following.push({
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
		following
	});

});

module.exports = router;