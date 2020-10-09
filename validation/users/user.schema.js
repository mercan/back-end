const joi = require('@hapi/joi');

const UserSignUpSchema = joi.object({
	name: joi.string().trim().min(6).max(40).required().messages({
		"string.min": `Name should have a minimum length of {#limit}.`,
		"string.max": `Name should have a maximum length of {#limit}.`,
		"string.empty": 'Name cannot be an empty field.',
		"any.required": 'Name is required',
	}),

	email: joi.string().email().trim().lowercase().min(14).max(60).required().messages({
		"string.min": `Email should have a minimum length of {#limit}.`,
		"string.max": `Email should have a maximum length of {#limit}.`,
		"string.email": 'Email must be a valid email address',
		"string.empty": 'Email cannot be an empty field.',
		"any.required": 'Email is required'
	}),

	username: joi.string().trim().min(3).max(40).required().messages({
		"string.min": `Username should have a minimum length of {#limit}.`,
		"string.max": `Username should have a maximum length of {#limit}.`,
		"string.empty": 'Username cannot be an empty field.',
		"any.required": 'Username is required',
	}),

	password: joi.string().min(7).max(80).required().messages({
		"string.min": `Password should have a minimum length of {#limit}.`,
		"string.max": `Password should have a maximum length of {#limit}.`,
		"string.empty": 'Password cannot be an empty field.',
		"any.required": 'Password is required',
	}),
});

const userLoginEmail = joi.object({
	email: joi.string().email().trim().lowercase().min(14).max(60).required().messages({
		"string.min": `Email should have a minimum length of {#limit}.`,
		"string.max": `Email should have a maximum length of {#limit}.`,
		"string.email": 'Email must be a valid email address',
		"string.empty": 'Email cannot be an empty field.',
		"any.required": 'Email is required'
	}),

	password: joi.string().min(7).max(80).required().messages({
		"string.min": `Password should have a minimum length of {#limit}.`,
		"string.max": `Password should have a maximum length of {#limit}.`,
		"string.empty": 'Password cannot be an empty field.',
		"any.required": 'Password is required',
	})
});

const isEmail = joi.object({
	email: joi.string().email().trim().lowercase().min(14).max(60).required().messages({
		"string.min": `Email should have a minimum length of {#limit}.`,
		"string.max": `Email should have a maximum length of {#limit}.`,
		"string.email": 'Email must be a valid email address',
		"string.empty": 'Email cannot be an empty field.',
		"any.required": 'Email is required'
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
		"string.min": `Code should have a minimum length of {#limit}.`,
		"string.max": `Code should have a maximum length of {#limit}.`,
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