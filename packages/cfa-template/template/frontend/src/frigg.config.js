module.exports = {
	appDisplayName: 'testapp',
	appVersion: '1.0.0' || require('../package.json').version,
	componentLayout: 'default-horizontal',
	componentFilter: {
		active: true,
		allTab: false,
		recentlyAddedTab: true,
		installedTab: true,
		categories: ['Marketing', 'Sales & CRM', 'Commerce', 'Social', 'Productivity', 'Finance'],
	},
	mongoUri: 'mongodb://localhost:27017/test',
	baseUrl: process.env.BASE_URL || 'http://localhost:3000',
	apiUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/dev',
};
