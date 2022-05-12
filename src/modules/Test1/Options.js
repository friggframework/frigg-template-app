const config = require('../../frigg.config');
const BaseManager = require('../Base/BaseManager');
const Manager = require('./Test1Manager');

const Test1Options = {
    module: Manager,
    integrations: [BaseManager],
    display: {
        name: 'Test1',
        description: 'Description',
        category: 'Category',
        detailsUrl: 'https://www.example.com/',
        icon: `${config.baseUrl}/assets/img/test1.png`,
    },
    hasUserConfig: false
}

module.exports = Test1Options;