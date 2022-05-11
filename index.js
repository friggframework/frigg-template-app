const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

// Import appName as db name here, use config file for Mongo Atlas
const db = mongoose.connect('mongodb://localhost:27017/frigg', {
	useMongoClient: true,
});

// build out http calls for serverless endpoints here => api.js
const User = require('./src/schemas/IndividualUser');

// User UserManager.js here
const registerUser = async (params) => {
	const user = new User();
	user.username = params.username;
	user.hash = await bcrypt.hashSync(params.password, parseInt(decimals));

	await user.create(user).then((user) => {
		console.table(user);
		console.info('New User Created');
		db.close();
	});
};

module.exports = {
	registerUser,
};
