const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newFollow = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  
  totalFollowers: { type: Number, default: 0 },
  totalFollowing: { type: Number, default: 0 },

  followers: [{
	  _id: false,
		userID: { type: Schema.Types.ObjectId },
	  created_At: { type: Date, default: Date.now() }
  }],

  following: [{
	  _id: false,
		userID: { type: Schema.Types.ObjectId },
		created_At: { type: Date, default: Date.now() }
	}],

	created_At: { type: Date, default: Date.now() }
}, { versionKey: false });

const Follow = mongoose.model('follow', newFollow);
module.exports = Follow;