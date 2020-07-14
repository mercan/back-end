const apiSecretKey = require('../config/api_secret_key').apiSecretKey;
const jwt = require('jsonwebtoken');

const tokenCreate = (id, name, picture) => jwt.sign(
	{ userid: id, name, picture }, apiSecretKey, {
		expiresIn: '30d' // 30 gün.
	} 
);

module.exports = tokenCreate;