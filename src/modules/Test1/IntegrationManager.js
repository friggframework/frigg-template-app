const IntegrationManager = require('@friggframework/core/managers/IntegrationManager');
const { debug } = require('@friggframework/logs');

class Test1IntegrationManager extends IntegrationManager {
    static Config = {
        name: 'test1',
        version: '1.0.0',
        supportedVersions: ['1.0.0'],
        events: ['EXAMPLE_EVENT'],
    };

    constructor(params) {
        super(params);
    }

    async processCreate(params) {
        this.integration.status = 'NEEDS_CONFIG';
        await this.integration.save();
    }

    async processUpdate(params) {}

    async processDelete(params) {}

    async getConfigOptions() {}
}

module.exports = Test1IntegrationManager;