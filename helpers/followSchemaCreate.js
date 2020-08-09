const Follow = require('../models/Follow');

const followSchemaCreate = userID => new Follow({ userID }).save();

module.exports = followSchemaCreate;