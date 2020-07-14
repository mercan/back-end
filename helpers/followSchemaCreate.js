const Follow = require('../models/Follow');

const followSchemaCreate = async function(userID) {
	const newFollow = new Follow({
		userID
	});

	const newFollowSave = await newFollow.save();

	return true;
}

module.exports = followSchemaCreate;