const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newJoinEvent = new Schema({
	userID: { type: Schema.Types.ObjectId, required: true, unique: true },

	totalJoinEvent: { type: Number, default: 0 },

	joinEvents: [
		{
			_id: false,
			eventID: { type: Schema.Types.ObjectId, required: true },
			eventType: { type: String, required: true },
			created_At: { type: Date, default: Date.now() },
			deleteEvent: { type: Boolean, default: false }
		}
	]
}, { versionKey: false });

const JoinEvent = mongoose.model('joinevent', newJoinEvent);
module.exports = JoinEvent;