const joi = require('@hapi/joi');

const isTwoFactorAuth = joi.object({
	// strict() 'true' & 'false' kabul etmiyor ekleyince.
	active: joi.boolean().required()
});

module.exports = {
	isTwoFactorAuth,
}