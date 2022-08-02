const request = require('supertest');
const { createApp } = require('../../app');
const userRoute = require('../../src/routers/user');
const { default: mongoose } = require('mongoose');

const app = createApp((app) => {
    app.use(userRoute);
});

describe('Users process tests', () => {
    let credentials = { username: 'yolo', password: 'wololo' };
    let token;

    beforeAll(() => {
        mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    it('Creates a user', async () => {
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
                expect(response.statusCode).toEqual(201);
                expect(response.body.token).toBeTruthy();
            });
    });
});
