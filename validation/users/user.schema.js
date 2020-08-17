const joi = require('@hapi/joi');

const UserSignUpSchema = joi.object({
	name: joi.string().trim().min(6).max(40).required(),

	email: joi.string().email().trim().lowercase().min(14).max(60).required().messages({
		"string.email": 'Email must be a valid email address',
		"string.empty": 'Email is required'
	}),

	username: joi.string().trim().min(3).max(40).required().messages({
		"string.min": `Username should have a minimum length of {#limit}.`,
		"string.max": `Username should have a maximum length of {#limit}.`,
		"string.empty": 'Username cannot be an empty field.',
		"any.required": 'Username is required',
	}),

	password: joi.string().min(7).max(80).required(),
});

const userLoginUsername = joi.object({
	username: joi.string().trim().min(3).max(40).required().messages({
		"string.min": `Username should have a minimum length of {#limit}.`,
		"string.max": `Username should have a maximum length of {#limit}.`,
		"string.empty": 'Username cannot be an empty field.',
		"any.required": 'Username is required',
	}),

	password: joi.string().min(7).max(80).required(),
});

const userLoginEmail = joi.object({
	email: joi.string().email().trim().lowercase().min(14).max(60).required().messages({
		"string.email": 'Email must be a valid email address',
		"string.empty": 'Email is required'
	}),

	password: joi.string().min(7).max(80).required(),
});

const isEmail = joi.object({
	email: joi.string().email().trim().lowercase().min(14).max(60).required().messages({
		"string.email": 'Email must be a valid email address',
		"string.empty": 'Email is required',
	})
});

const isUsername = joi.object({
	username: joi.string().trim().min(3).max(40).required().messages({
		"string.min": `Username should have a minimum length of {#limit}.`,
		"string.max": `Username should have a maximum length of {#limit}.`,
		"string.empty": 'Username cannot be an empty field.',
		"any.required": 'Username is required',
	})
});

const isTwoFactorCode = joi.object({
	username: joi.string().trim().min(3).max(40).required().messages({
		"string.min": `Username should have a minimum length of {#limit}.`,
		"string.max": `Username should have a maximum length of {#limit}.`,
		"string.empty": 'Username cannot be an empty field.',
		"any.required": 'Username is required',
	}),

	code: joi.string().min(6).max(6).required().messages({
		"string.min": `Question should have a minimum length of {#limit}.`,
		"string.max": `Question should have a maximum length of {#limit}.`,
		"string.empty": 'Code cannot be an empty field.',
		"any.required": 'Code is required.',
	})
});

module.exports = {
	UserSignUpSchema,
	userLoginUsername,
	userLoginEmail,
	isEmail,
	isUsername,
	isTwoFactorCode,
}