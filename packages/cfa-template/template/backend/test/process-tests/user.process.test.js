const request = require('supertest');
const nock = require('nock');
const { createApp } = require('../../app');
const userRoute = require('../../src/routers/user');
const authRoute = require('../../src/routers/auth');
const demoRoute = require('../../src/routers/demo');
const { default: mongoose } = require('mongoose');
const jsforce = require('jsforce');

// jest.mock('@friggframework/assertions', () => {
//     const lodashGet = require('lodash.get');
//     const originalModule = jest.requireActual('@friggframework/assertions');
//     const get = (o, key, defaultValue) => {
//         const value = lodashGet(o, key, defaultValue);

//         if (value !== undefined) {
//             return value;
//         }

//         if (key == 'access_token') return 'salesforce_access_token';

//         if (defaultValue === undefined) {
//             throw new Error({
//                 parent: this,
//                 key: key,
//             });
//         }

//         return defaultValue;
//     };

//     return {
//         __esModule: true,
//         ...originalModule,
//         get,
//     };
// });

const app = createApp((app) => {
    app.use(userRoute);
    app.use(authRoute);
    app.use(demoRoute);
});

// const authSpy = jest
//     .spyOn(jsforce.Connection.prototype, 'authorize')
//     .mockImplementation(() => {
//         return Promise.resolve({
//             id: 'salesforce_user_id',
//             organizationId: 'salesforce_organization_id',
//             url: 'salesforce_org_url',
//         });
//     });

// jest.mock('jsforce', () => {
//     const original = jest.requireActual('jsforce');
//     class Connection extends original.Connection {
//         accessToken = 'salesforce_access_token';
//         authorize() {
//             return Promise.resolve({
//                 id: 'salesforce_user_id',
//                 organizationId: 'salesforce_organization_id',
//                 url: 'salesforce_org_url',
//             });
//         }
//     }
//     return {
//         ...original,
//         Connection: Connection,
//     };
// });

// const mocks = new Map();
// function mockProperty(object, property, value) {
//     const descriptor = Object.getOwnPropertyDescriptor(object, property);
//     const mocksForThisObject = mocks.get(object) || {};
//     mocksForThisObject[property] = descriptor;
//     mocks.set(object, mocksForThisObject);
//     Object.defineProperty(object, property, { get: () => value });
// }

// const tokenSpy = jest
//     .spyOn(jsforce.Connection.prototype, 'accessToken', 'get')
//     .mockReturnValue('salesforce_access_token');

let getIntegrationsBaselineResponse = {
    entities: {
        authorized: [],
        options: [
            {
                display: {
                    description: 'Sales & CRM',
                    detailsUrl: 'https://salesforce.com',
                    icon: 'https://friggframework.org/assets/img/salesforce.jpeg',
                    name: 'Salesforce',
                },
                hasUserConfig: false,
                isMany: false,
                requiresNewEntity: false,
                type: 'salesforce',
            },
        ],
        primary: 'salesforce',
    },
    integrations: [],
};

describe('Users process tests', () => {
    let credentials = { username: 'demo@lefthook.com', password: 'demo' };
    let token;
    let apiExternalAuthorizationUrl; // ??

    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/');
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    it.skip('Creates a user', async () => {
        await request(app)
            .post('/user/create')
            .send(credentials)
            .then((response) => {
                token = response.body.token;
                expect(response.statusCode).toEqual(201);
                expect(response.body.token).toBeTruthy();
                expect(response.body.token).toEqual(token);
            });
    });

    it('Logs in as the created user', async () => {
        await request(app)
            .post('/user/login')
            .send(credentials)
            .then((response) => {
                token = response.body.token;
                expect(response.statusCode).toEqual(201);
                expect(response.body.token).toBeTruthy();
            });
    });

    it.skip('Lists user baseline integrations', async () => {
        await request(app)
            .get('/api/integrations')
            .set('Authorization', 'Bearer ' + token)
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toMatchObject(
                    getIntegrationsBaselineResponse
                );
            });
    });

    it('Triggers API authorization process', async () => {
        await request(app)
            .get(
                '/api/authorize?entityType=salesforce&connectingEntityType=connectwise'
            )
            .set('Authorization', 'Bearer ' + token)
            .then((response) => {
                expect(response.statusCode).toEqual(200);
                expect(response.body).toHaveProperty('type', 'oauth2');
                expect(response.body).toHaveProperty('url');
                apiExternalAuthorizationUrl = response.body.url;
            });
    });

    it('Registers API authorization process', async () => {
        const scope = nock('https://test.salesforce.com/services/oauth2')
            .post('/token')
            .once()
            .reply(200, {
                id: 'salesforce_user_id/organization_id',
                organizationId: 'salesforce_organization_id',
                url: 'salesforce_org_url',
                access_token: 'some_access_token',
                refresh_token: 'some_refresh_token',
                instance_url: process.env.REDIRECT_URI,
            });

        const payload = {
            entityType: 'salesforce',
            data: {
                code: 'aPrx6oJIsUGUE2NdOeCvZslBS_50cxJ1xlCB6goephFgcc3xAxEQiyE3I9Yn9TLrHzzUxsKZ_A==',
            },
        };

        await request(app)
            .post('/api/authorize')
            .set('Authorization', 'Bearer ' + token)
            .set('Referer', 'http://localhost:3000/')
            .send(payload)
            .then((res) => {
                // expect(authSpy).toHaveBeenCalled();
                expect(res.statusCode).toEqual(200);
            });
        scope.isDone();
        /**
        console.error when using authSpy + mocked get method
            Error: Invalid URI "/services/data/v42.0/sobjects/Organization/describe"
            at Request.Object.<anonymous>.Request.init (C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\request\request.js:273:31)
            at new Request (C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\request\request.js:127:8)
            at request (C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\request\index.js:53:10)
            at C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\request\index.js:100:12
            at createRequest (C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\jsforce\lib\transport.js:84:13)
            at Promise.promise.then (C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\jsforce\lib\transport.js:43:5)
            at HttpApi.Object.<anonymous>.HttpApi.request (C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\jsforce\lib\http-api.js:82:47)
            at Object.<anonymous>.module.exports.Object.<anonymous>.Connection.request (C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\jsforce\lib\connection.js:355:18)
            at Object.<anonymous>.module.exports.Object.<anonymous>.Connection.describe.Connection.describeSObject (C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\jsforce\lib\connection.js:1195:15)
            at Object.<anonymous>.module.exports.$fn (C:\repos\create-frigg-app\packages\cfa-template\template\backend\node_modules\jsforce\lib\cache.js:239:10)
        */
        /**
        console.error when using nock method
            Error: connect ECONNREFUSED 127.0.0.1:3000
                at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1161:16) {
                errno: -4078,
                code: 'ECONNREFUSED',
                syscall: 'connect',
                address: '127.0.0.1',
                port: 3000
            }
        */
    });
});
