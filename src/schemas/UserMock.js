const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	username: { type: String },
	hash: { type: String },
});

module.exports = mongoose.model('UserMock', UserSchema);
