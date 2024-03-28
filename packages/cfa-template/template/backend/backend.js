const { createFriggBackend } = require('@friggframework/core');
const HubSpotIntegration = require('./src/integrations/HubSpotIntegration');
const LinearIntegration = require('./src/integrations/LinearIntegration');

const appDefinition = {
    integrations:[
        LinearIntegration,
        HubSpotIntegration,
    ],
    user: {
        password: true
    }
}
const backend = createFriggBackend(appDefinition);
module.exports = {...backend}
