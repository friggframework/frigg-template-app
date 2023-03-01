require('../setupEnv');
const { TestMongo } = require('@friggframework/test-environment');
require('dotenv').config();

module.exports = async () => {
    global.testMongo = new TestMongo();
    await global.testMongo.start();
};
