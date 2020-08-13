const jwt = require('jsonwebtoken');

const tokenCheck = token => {
	
	if (!token) {
		return false;
	} else {
		return jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decode) =>
			err ? false : decode
		);
	}
	
}

module.exports = tokenCheck;