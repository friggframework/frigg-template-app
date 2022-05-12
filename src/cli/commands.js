#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const { Plop, run } = require('plop');
const inquirer = require('inquirer');
const minimist = require('minimist');

const { registerUser } = require('../../index');

// Customer Questions
const registerUserPrompts = [
	{
		type: 'input',
		name: 'username',
		message: 'Developer account email:',
	},
	{
		type: 'password',
		name: 'password',
		message: 'Developer account password:',
	},
];

program.name('frigg').description('Generate Frigg API Modules').version(require('../../package.json').version);

program.addHelpText(
	'after',
	`
Function                Alias        Description
version                 -v           Checks the version of Frigg
frigg user:register     -ur          Creates a new Frigg user
frigg user:login        -ul          Logs in a Frigg user
frigg module:generate   -mg          Generates a new Frigg API module 
frigg app:init          -ac          Initializes a new Frigg app
frigg app:serve         -as          Serves a local instance of the Frigg app
frigg app:build         -ab          Builds a serverless ready Frigg app
	`
);

program
	.command('user:register')
	.description('Creates a new Frigg user')
	.action(() => {
		inquirer.prompt(registerUserPrompts).then((answers) => registerUser(answers));
	});

program
	.command('module:generate')
	.description('Generates a new Frigg API module ')
	.action(() => {
		const argv = minimist(process.argv.slice(2));
		const options = {
			cwd: argv.cwd,
			configPath: 'src/cli/generator.js',
			completion: argv.completion,
		};
		Plop.launch(options, run);
	});

program
	.command('app:init')
	.description('Creates a new Frigg app')
	.action(() => {
		const argv = minimist(process.argv.slice(2));
		const options = {
			cwd: argv.cwd,
			configPath: 'src/cli/initialize.js',
			completion: argv.completion,
		};
		Plop.launch(options, run);
	});

program
	.command('app:serve')
	.description('Serves a local instance of the Frigg app')
	.action(() => {
		console.log('Serving app');
	});

program.parse(process.argv);
