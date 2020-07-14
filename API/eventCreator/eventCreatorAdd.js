const VerifyToken = require('../../middleware/api-verify-token');
const Event       = require('../../models/Event');
const User        = require('../../models/User');
const router      = require('express').Router();

router.post('/', VerifyToken, async (req, res) => {
	return "Eklenicek :D ";
});



module.exports = router;