const config = require('../../frigg.config');
// const BaseManager = require('../Base/Manager');
// const Manager = require('./Manager');

const Test2Options = {
	// module: Manager,
	// integrations: [BaseManager],
	display: {
		name: 'Test2',
		description: 'Description',
		category: 'Category',
		detailsUrl: 'https://www.example.com/',
		icon: `${config.baseUrl}/assets/img/test2.png`,
	},
	hasUserConfig: () => {
		if (OAuth2Base === 'ApiBaseKey') {
			return true;
		}
		return false;
	},
};

module.exports = Test2Options;
