module.exports = async () => {
    return {
        globalSetup: './scripts/set-up-tests.js',
        globalTeardown: './scripts/tear-down-tests.js',
        runner: 'groups',
        testTimeout: 240_000, // 2 minutes
    };
};
