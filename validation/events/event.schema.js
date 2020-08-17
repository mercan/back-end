const joi = require('@hapi/joi');

const createQuestionSchema = joi.object({
	eventCode: joi.string().trim().min(3).max(25).required().messages({
		"string.min": `Event code should have a minimum length of {#limit}.`,
		"string.max": `Event code should have a maximum length of {#limit}.`,
		"string.empty": 'Event code cannot be an empty field.',
		"any.required": 'Event code is required',
	}),

	question: joi.string().trim().min(8).max(160).required().messages({
		"string.min": `Question should have a minimum length of {#limit}.`,
		"string.max": `Question should have a maximum length of {#limit}.`,
		"string.empty": 'Question cannot be an empty field.',
		"any.required": 'Question is required',
	})
});

const isEventCode = joi.object({
	eventCode: joi.string().trim().min(3).max(25).required().messages({
		"string.min": `Event code should have a minimum length of {#limit}.`,
		"string.max": `Event code should have a maximum length of {#limit}.`,
		"string.empty": 'Event code cannot be an empty field.',
		"any.required": 'Event code is required',
	})
});

const isQuestion = joi.object({
	question: joi.string().trim().min(8).max(160).required().messages({
		"string.min": `Question should have a minimum length of {#limit}.`,
		"string.max": `Question should have a maximum length of {#limit}.`,
		"string.empty": 'Question cannot be an empty field.',
		"any.required": 'Question is required',
	})
});

const createEventSchema = joi.object({
	name: joi.string().trim().min(3).max(30).required().messages({
		"string.min": `Event name should have a minimum length of {#limit}.`, // 'Event name cannot be less than 3 characters.',
		"string.max": `Event name should have a maximum length of {#limit}.`,
		"string.empty": 'Event name cannot be an empty field.',
		"any.required": 'Event name is required.',
	}),

	type: joi.string().required().messages({
		"string.empty": 'Event type cannot be an empty field.',
		"any.required": 'Event type is required.',
	})
});

module.exports = {
	createEventSchema,
	createQuestionSchema,
	isEventCode,
	isQuestion,
}