const router = require('express').Router();

router.get('/logout', (req, res) => {
	res.clearCookie('auth_token');
	res.clearCookie('express:sess:');
	res.clearCookie('express:sess.sig');

	res.redirect('https://soru.io');
});


router.post('/logout', (req, res) => {
	res.clearCookie('auth_token');
	res.clearCookie('express:sess:');
	res.clearCookie('express:sess.sig');

	if (req.cookies.auth_token && req.cookies["express:sess:"] && req.cookies['express:sess.sig']) 
		return res.json({ code: 200 });

	return res.status(400).json({ code: -1 });
});

module.exports = router;