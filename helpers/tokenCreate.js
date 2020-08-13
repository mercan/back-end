const jwt = require('jsonwebtoken');

const tokenCreate = (id, name, picture) =>
	jwt.sign(
		{
			userid: id, name, picture
		},
		process.env.TOKEN_SECRET_KEY,
		{
			expiresIn: '15d' // 15 gün.
		} 
	);

module.exports = tokenCreate;