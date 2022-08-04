const request = require('supertest');
const { createApp } = require('../../app');
const user = require('../../src/routers/user');

const app = createApp((app) => {
    app.use(user);
});

jest.mock('../../src/managers/UserManager', () => {
    const UserManagerMocked = { createUserToken: jest.fn().mockResolvedValue('token for testing') };

    return {
        loginUser: jest.fn(() => UserManagerMocked)
    };
});

describe('Users process tests', () => {
    it('Test test', async () => {
        let credentials = { username: 'yolo', password: 'wololo' };

        await request(app)
            .post('/user/login')
            .send(credentials)
            .then((response) => {
                expect(response.statusCode).toEqual(201);
                expect(response.body.token).toEqual('token for testing');
            });
    });
});
