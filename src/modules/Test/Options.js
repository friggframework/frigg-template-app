const config = require('../../frigg.config');
// const BaseManager = require('../Base/BaseManager');
// const Manager = require('./TestManager');

const TestOptions = {
	// module: Manager,
	// integrations: [BaseManager],
	display: {
		name: 'Test',
		description: 'Description',
		category: 'Category',
		detailsUrl: 'https://www.example.com/',
		icon: `${config.baseUrl}/assets/img/test.png`,
	},
	hasUserConfig: () => {
		if (ApiKeyBase === 'ApiBaseKey') {
			return true;
		}
		return false;
	},
};

module.exports = TestOptions;
