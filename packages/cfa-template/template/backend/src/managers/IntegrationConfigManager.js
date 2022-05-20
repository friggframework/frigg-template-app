const Parent = require('@friggframework/core/managers/IntegrationConfigManager');
const Options = require('@friggframework/core/objects/integration/Options');

// Entities that we are going to use for integration for this particular app
const ConnectWiseManager = require('./entities/ConnectWiseManager');
const SalesforceManager = require('./entities/SalesforceManager');

class IntegrationConfigManager extends Parent {
    constructor(params) {
        super(params);
        this.primary = ConnectWiseManager;
        this.options = [

            new Options({
                module: SalesforceManager,
                integrations: [ConnectWiseManager],
                display: {
                    name: 'Salesforce',
                    description: 'Sales & CRM',
                    category: 'Sales & CRM',
                    detailsUrl: 'https://salesforce.com',
                    icon: 'https://friggframework.org/assets/img/salesforce.jpeg',
                },
            }),
        ];
    }
}

module.exports = IntegrationConfigManager;
