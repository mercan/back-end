const joi = require('@hapi/joi');

const UserSignUpSchema = joi.object({
	name: joi.string().trim().min(6).max(40).required(),
	email: joi.string().email().trim().lowercase().min(14).max(60).required().messages({
		"string.email": 'Email must be a valid email address',
		"string.empty": 'Email is required'
	}),
	username: joi.string().trim().min(3).max(40).required(),
	password: joi.string().min(7).max(80).required(),
});

const UserLoginUsername = joi.object({
	username: joi.string().trim().min(3).max(40).required().messages({
		"string.username": 'Username is invalid.',
		"string.empty": 'Username is required'
	}),
	password: joi.string().min(7).max(80).required(),
});

const UserLoginEmail = joi.object({
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
		"string.username": 'Username is invalid.',
		"string.empty": 'Username is required'
	})
});

module.exports = {
	UserSignUpSchema,
	UserLoginUsername,
	UserLoginEmail,
	isEmail,
	isUsername,
}