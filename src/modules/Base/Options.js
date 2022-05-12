const config = require('../../frigg.config');
// const BaseManager = require('../Base/BaseManager');
// const Manager = require('./BaseManager');

const BaseOptions = {
	// module: Manager,
	// integrations: [BaseManager],
	display: {
		name: 'Base',
		description: 'Description',
		category: 'Category',
		detailsUrl: 'https://www.example.com/',
		icon: `${config.baseUrl}/assets/img/base.png`,
	},
	hasUserConfig: () => {
		if (OAuth2Base === 'ApiBaseKey') {
			return true;
		}
		return false;
	},
};

module.exports = BaseOptions;
