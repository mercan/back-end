const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const newNotification = new Schema({
	userID: { type: Schema.Types.ObjectId, required: true, unique: true },
	notifications: [
		{
			_id: false,
			userID: Schema.Types.ObjectId,
			email: String,
			created_At: { type: String, default: moment().format('LLL') }
		}
	]

}, { versionKey: false });

const Notification = mongoose.model('notification', newNotification);
module.exports = Notification;