const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const newEvent = new Schema({
	eventCode: { 
		type: String, required: true, minlength: 3, maxlength: 25, 
		unique: true, uppercase: true 
	},
	eventName: { type: String, required: true, minlength: 3, maxlength: 30 },
	eventType: { type: String, required: true },
	eventLogo: String, 

	premium: { type: Number, required: true },

	created_At: { type: Date, default: Date.now() },
	lastDate: Date,

	totalAnswers:   { type: Number, default: 0 },
	totalJoinEvent: { type: Number, default: 0 },
	totalQuestion:  { type: Number, default: 0 },

	deleteEvent: { type: Boolean, default: false },

	creator: [
		{
			_id: false,
			userID: { type: Schema.Types.ObjectId, required: true },
			name: { type: String, required: true },
			email: String,
			picture: String,
			owner: { type: Boolean, default: false }
		}
	],

	features: {
		// Banlı Kullanıcıların soru sorup/soramayacağı'nı belirler.
		bannedUserQuestion: { type: Boolean, default: true },
		// Login olan kullanıcılar cevap verebilir sadece true olunca.
		loginQuestion: { type: Boolean, default: false },
		// Login olan kullanıcılar like atabilir sadece true olunca.
		loginLike: { type: Boolean, default: false },
		// Soru sormayı açıp/kapatıyor.
		question: { type: Boolean, default: true },
		// Her kullanıcının kaç soru hakkı olduğunu belirler ( default : sınırsız )
		questionLimit: { type:Number, default: -1 }, 
		// Toplamda kaç soru sorulabilir onu belirliyor ( default : sınırsız )
		totalQuestionLimit: { type:Number, default: -1 },
		// True ise reply açık false ise reply kapalı.
		reply: { type: Boolean, default: true },
		// Email gönderimi için izin alır.
		requestSendEmail: { type: Boolean, default: false },
		// Sorulara kendi ufak logosunu koyabilir.
		questionLogo: String,
	},

	questions: [{
		userID: Schema.Types.ObjectId,
		ipAddress: String,
		name: 		String,
		picture: String,
		question: 	{ type: String, minlength: 8, maxlength: 160 },
		created_AtMoment: { type: String, default: moment().format('LLL') },
		created_At: { type: Date, default: Date.now() },
		totalLike:  { type: Number, default: 0 },
		deleted: 		{ type: Boolean, default: false },
		archived: 	{ type: Boolean, default: false },

		reply: [{
			userID: Schema.Types.ObjectId,
			ipAddress: String,
			name: String,
			picture: String, 
			answers:    { type: String, minlength: 8, maxlength: 160 },
			created_AtMoment: { type: String, default: moment().format('LLL') },
			created_At: { type: Date, default: Date.now() },
			totalLike:  { type: Number, default: 0 },
			deleted: 		{ type: Boolean, default: false },
			archived: 	{ type: Boolean, default: false },
		}]	
	}],


	bannedUserID: [ 
		{
			_id: false,
			userID: Schema.Types.ObjectId, name: String, 	bannedDate: {
				type: String, default: moment().format('LLL')
			}
		} 
	],

	bannedUserIP: [ String ]

}, { versionKey: false });

const Event = mongoose.model('event', newEvent);

module.exports = Event;