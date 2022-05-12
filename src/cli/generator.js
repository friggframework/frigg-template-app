const generator = (plop) => {
	plop.setGenerator('api-module', {
		description: 'Generate a Frigg API Module.',

		// TODO: Validate inputs here
		prompts: [
			{
				type: 'input',
				name: 'command',
				message: 'Generate a Frigg API Module.',
			},
			{
				type: 'input',
				name: 'apiModuleName',
				message: 'What is the name of this API Module?',
			},
			{
				type: 'list',
				name: 'authStrategy',
				message: 'Select an authentication strategy:',
				choices: [
					{
						name: 'Basic',
						value: 'ApiKeyBase',
					},
					{
						name: 'OAuth2',
						value: 'OAuth2Base',
					},
				],
			},
		],
		actions: (data) => [
			{
				type: 'add',
				path: '../modules/{{ pascalCase apiModuleName }}/Api.js',
				templateFile: '../templates/Api.js.hbs',
			},
			{
				type: 'add',
				path: '../modules/{{ pascalCase apiModuleName }}/Credential.js',
				templateFile: '../templates/Credential.js.hbs',
			},
			{
				type: 'add',
				path: '../modules/{{ pascalCase apiModuleName }}/Entity.js',
				templateFile: '../templates/Entity.js.hbs',
			},
			{
				type: 'add',
				path: '../modules/{{ pascalCase apiModuleName }}/IntegrationManager.js',
				templateFile: '../templates/IntegrationManager.js.hbs',
			},
			{
				type: 'add',
				path: '../modules/{{ pascalCase apiModuleName }}/Manager.js',
				templateFile: '../templates/Manager.js.hbs',
			},
			{
				type: 'add',
				path: '../modules/{{ pascalCase apiModuleName }}/README.md',
				templateFile: '../templates/README.md.hbs',
			},
			{
				type: 'add',
				path: '../modules/{{ pascalCase apiModuleName }}/{{ pascalCase apiModuleName }}.test.js',
				templateFile: '../templates/Test.js.hbs',
			},
			{
				type: 'add',
				path: '../modules/{{ pascalCase apiModuleName }}/index.js',
				templateFile: '../templates/index.js.hbs',
			},
			{
				type: 'add',
				path: '../modules/{{ pascalCase apiModuleName }}/Options.js',
				templateFile: '../templates/Options.js.hbs',
				data: () => {
					if (data.authStrategy === 'ApiKeyBase') {
						return {
							userConfig: true,
						};
					}
					return {
						userConfig: false,
					};
				},
			},
		],
	});
};

module.exports = generator;
