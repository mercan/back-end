const joi = require('@hapi/joi');

const createQuestionSchema = joi.object({
	eventCode: joi.string().min(3).max(25).required().messages({
		"string.email": 'Event code invalid.',
		"string.empty": 'Event code is required'
	}),

	question: joi.string().min(8).max(160).required().messages({
		"string.email": 'Question invalid.',
		"string.empty": 'Question is required'
	})
});

const isEventCode = joi.object({
	eventCode: joi.string().min(3).max(25).required().messages({
		"string.email": 'Event code invalid.',
		"string.empty": 'Event code is required'
	})
});

const isQuestion = joi.object({
	question: joi.string().min(8).max(160).required().messages({
		"string.email": 'Question invalid.',
		"string.empty": 'Question is required'
	})
});

module.exports = {
	createQuestionSchema,
	isEventCode,
	isQuestion,
}