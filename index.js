const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

// Import appName as db name here, use config file for Mongo Atlas
// generate db instance after
let db;

const initializeDb = async () => {
	try {
		if (fs.existsSync('./src/frigg.config')) {
			db = await mongoose.connect(require('./src/frigg.config').mongoUri);
		}
	} catch (err) {
		console.error(err);
	}
};

// build out http calls for serverless endpoints here => api.js
const User = require('./src/schemas/UserMock');

// Use UserManager.js and IndividualUser.js here
const registerUser = async (params) => {
	if (!db) {
		await initializeDb();
	}
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
