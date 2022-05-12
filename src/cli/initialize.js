const initialize = (plop) => {
	plop.setGenerator('app-initilize', {
		description: 'Create Frigg Template App.',

		// TODO: Validate inputs here
		prompts: [
			{
				type: 'input',
				name: 'command',
				message: 'Create Frigg Template App.',
			},
			{
				type: 'input',
				name: 'appName',
				message: 'App Name:',
			},
			{
				type: 'input',
				name: 'appVersion',
				message: 'App Version:',
			},
			{
				type: 'list',
				name: 'database',
				message: 'Select a database type:',
				choices: [
					{
						name: 'MongoDB (Local)',
						value: 'mongoLocal',
					},
					{
						name: 'MongoDB (Atlas)',
						value: 'mongoAtlas',
					},
				],
			},
			{
				type: 'list',
				name: 'componentLayout',
				message: 'Select a starting component layout:',
				choices: [
					{
						name: 'default-horizontal',
						value: 'default-horizontal',
					},
					{
						name: 'default-vertical',
						value: 'default-vertical',
					},
				],
			},
		],
		actions: (data) => [
			{
				type: 'add',
				path: '../frontend/src/frigg.config.js',
				templateFile: '../templates/config.js.hbs',
				data: () => {
					if (data.database === 'mongoAtlas') {
						return {
							databaseUri: '<INSERT_MONGODB_ATLAS_URI_HERE>',
						};
					}
					return {
						databaseUri: `mongodb://localhost:27017/${data.appName}`,
					};
				},
			},
		],
	});
};

module.exports = initialize;
