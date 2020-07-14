const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newBlock = new Schema({
	userID: { type: Schema.Types.ObjectId, required: true },
	
	blocks: [{
		_id: false,
		userID: { type: Schema.Types.ObjectId, required: true },
		showQuestions: { type: Boolean, default: false },
		infoMessage: { type: String, maxlength: 60 },
		created_At: { type: Date, default: Date.now() }
	}],

	created_At: { type: Date, default: Date.now() }
	
}, { versionKey: false });

const Block = mongoose.model('block', newBlock);

module.exports = Block;