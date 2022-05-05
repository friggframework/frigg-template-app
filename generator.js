const config = (plop) => {
	plop.setGenerator('api-module', {
		description: 'Generate a Frigg API Module.',

		// TODO: Validate inputs here
		prompts: [
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
		actions: [
			{
				type: 'add',
				path: 'src/modules/{{ pascalCase apiModuleName }}/Api.js',
				templateFile: 'src/templates/Api.js.hbs',
			},
			{
				type: 'add',
				path: 'src/modules/{{ pascalCase apiModuleName }}/Credential.js',
				templateFile: 'src/templates/Credential.js.hbs',
			},
			{
				type: 'add',
				path: 'src/modules/{{ pascalCase apiModuleName }}/Entity.js',
				templateFile: 'src/templates/Entity.js.hbs',
			},
			{
				type: 'add',
				path: 'src/modules/{{ pascalCase apiModuleName }}/IntegrationManager.js',
				templateFile: 'src/templates/IntegrationManager.js.hbs',
			},
			{
				type: 'add',
				path: 'src/modules/{{ pascalCase apiModuleName }}/Manager.js',
				templateFile: 'src/templates/Manager.js.hbs',
			},
			{
				type: 'add',
				path: 'src/modules/{{ pascalCase apiModuleName }}/Options.js',
				templateFile: 'src/templates/Options.js.hbs',
			},
			{
				type: 'add',
				path: 'src/modules/{{ pascalCase apiModuleName }}/README.md',
				templateFile: 'src/templates/README.md.hbs',
			},
			{
				type: 'add',
				path: 'src/modules/{{ pascalCase apiModuleName }}/{{ pascalCase apiModuleName }}.test.js',
				templateFile: 'src/templates/Test.js.hbs',
			},
		],
	});
};

module.exports = config;
