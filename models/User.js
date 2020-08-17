const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema({
	socialID: String,
	connect: 	{ type: String, maxlength: 15 },

	username: { type: String, maxlength: 40, minlength: 3 },
	name: 		{ type: String, maxlength: 40, minlength: 6 },
	email: 		{ type: String, maxlength: 60, minlength: 14 },
	phone_number: { type: String, maxlength: 11, minlength: 11 },

	password: { type: String, maxlength: 80, minlength: 7 },
	gender: 	{ type: String, maxlength: 6, minlength: 4 },
	birthday: Date,
	picture:  String,
	
	premium: 	{ type: Number, default: 0 },
	verified: { type: Boolean, default: false },

	hobbies: [ String ],

	oldPasswords: [{
		_id: false,
		password: { type: String, maxlength: 80, minlength: 7 },
		modification_date: { type: Date, default: Date.now() },
	}],

	account: {
		reset_password_code: { type: String, maxlength: 6, minlength: 6 },
		reset_password_code_date: { type: Date },

		two_factor_code: { type: String, maxlength: 6, minlength: 6 },
		two_factor_code_date: { type: Date },
	},

	settings: {
		twoFactorAuth: { type: Boolean, default: false }
	},

	socialMediaAccounts: {
		twitter: 	 String,
		facebook:  String,
		github: 	 String,
		medium: 	 String,
		quora: 		 String,
		reddit: 	 String,
		linkedin:  String,
		twitch: 	 String,
		microsoft: String,
		appleId: 	 String,
		showAccounts: []
	},
/*
	location: {
		city: 			 { type: String, required: true },
		countryName: { type: String, required: true },
		countryCode: { type: String, required: true },
		timezone: 	 { type: String, required: true },
		currency: 	 { type: String, required: true }
	},
*/
	profile: {
		showProfile: { type: Boolean, default: true },
	},

	// Bütün etkinliklerinden banlanan kullanıcılar.
	bannedUserID: [{
		_id: false,
		userID: Schema.Types.ObjectId, name: String,
		created_At: { type: Date, default: Date.now() }
	}],

	// Bütün etkinliklerinden banlanan kullanıcılar.
	bannedUserIP: [ String ],

	created_At: { type: Date, default: Date.now() }

}, { versionKey: false });

module.exports = mongoose.model('user', newUser);