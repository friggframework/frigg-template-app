const { Options } = require('@friggframework/integrations');
const SalesforceManager = require('./entities/SalesforceManager');

// Entities that we are going to use for integration for this particular app
class IntegrationConfigManager {
    constructor(params) {
        this.primary = SalesforceManager;
        this.options = [

            new Options({
                module: SalesforceManager,
                integrations: [SalesforceManager],
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

    async getIntegrationOptions() {
        return {
            entities: {
                primary: this.primary.getName(),
                options: this.options.map((val) => val.get()),
                authorized: [],
            },
            integrations: [],
        };
    }
}

module.exports = IntegrationConfigManager;
