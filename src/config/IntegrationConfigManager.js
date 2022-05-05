const Parent = require('@friggframework/core/managers/IntegrationConfigManager');
const Options = require('@friggframework/core/objects/integration/Options');
const BaseManager = require('../modules/Base/Manager');
const requireGlob = require('require-glob');

const ModuleOptions = requireGlob('../modules/**/Options.js').then((modules) => modules);

class IntegrationConfigManager extends Parent {
	constructor(params) {
		super(params);
		this.primary = BaseManager;
		this.options = () => {
			const optionsArr = [];
			for (const option of ModuleOptions) {
				response.push(new Options(option));
			}
			return optionsArr;
		};
	}
}

module.exports = IntegrationConfigManager;
