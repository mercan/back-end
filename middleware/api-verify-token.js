const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(400).json({
			code: 400,
			message: 'Token cannot be empty.'
		});
	}

	jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decode) => {
		if (err) {
			return res.status(401).json({ 
				code: 401,
				message: 'Token is invalid or expired'
			});
		}
		
		req.decode = decode;
		next();
	});
	
}