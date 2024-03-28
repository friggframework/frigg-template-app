const { createMockIntegration, createMockApiObject } = require('@friggframework/devtools');
const { connectToDatabase, disconnectFromDatabase } = require('@friggframework/core');
const LinearIntegration = require('../../src/integrations/LinearIntegration');
const linearMocks = require('../mocks/linearMocks');


const setupMockIntegration = async () => {
    const integration = await createMockIntegration(LinearIntegration);
    integration.target = integration.linear;
    integration.target.api = createMockApiObject(jest, integration.linear.api, linearMocks);
    return integration;
}

describe('Linear Integration Tests', () => {
    let integration;
    beforeAll(async () => {
        await connectToDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase();
    })

    beforeAll(async () => {
        integration = await setupMockIntegration();
    });

    it('onCreate should define integration config', async () => {
        integration.record.save = jest.fn().mockResolvedValue({});
        const response = await integration.onCreate();
        expect(response.status).toBe('ENABLED');
    });

    describe.skip('Sample Data Test', () => {
        it('Should retrieve action options', async () => {
            const sampleData = await integration.getSampleData();
            expect(sampleData).toBeDefined();
        });

    });

    describe('ReceiveNotification tests', () => {
        let actionData;
        it('Should retrieve projects', async () => {
            const projects = await integration.notify('GET_PROJECTS');
            expect(projects).toBeDefined();
        });
    });
});
