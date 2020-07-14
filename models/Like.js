const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newLike = new Schema({
	userID: { type: Schema.Types.ObjectId },
	ipAddress: String,

	events: [
		{
			_id: false,
			eventID: Schema.Types.ObjectId,
			likes: [ Schema.Types.ObjectId ]
		}
	]
}, { versionKey: false });

const Like = mongoose.model('like', newLike);
module.exports = Like;