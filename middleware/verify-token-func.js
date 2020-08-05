const apiSecretKey = require('../config/api_secret_key').apiSecretKey;
const jwt = require('jsonwebtoken');

const tokenCheck = token => {
	
	if (!token) {
		return false;
	} else {
		return jwt.verify(token, apiSecretKey, (err, decode) =>
			err ? false : decode
		);
	}
	
}

module.exports = tokenCheck;