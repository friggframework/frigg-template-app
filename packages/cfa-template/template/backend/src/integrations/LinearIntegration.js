const { IntegrationBase, Options } = require('@friggframework/core');
const { Definition: LinearModule } = require('@friggframework/api-module-linear');
const _ = require('lodash');

class LinearIntegration extends IntegrationBase {
    static Config = {
        name: 'linear',
        version: '1.0.0',
        supportedVersions: ['1.0.0'],
        events: ['GET_PROJECTS'],
    };

    static Options =
        new Options({
            module: LinearModule,
            integrations: [LinearModule],
            display: {
                name: 'Linear',
                description: 'Project Planning',
                category: 'Project Planning',
                detailsUrl: 'https://linear.app',
                icon: 'https://friggframework.org/assets/img/linear-company-icon.svg',
            }
        });

    static display =  {
        name: 'Linear',
        description: 'Project Planning',
        category: 'Project Planning',
        detailsUrl: 'https://linear.app',
        icon: 'https://friggframework.org/assets/img/linear-company-icon.svg',
    }

    static modules = {
        linear: LinearModule
    }

    /**
     * HANDLE EVENTS
     */
    async receiveNotification(notifier, event, object = null) {
        if (event === 'GET_PROJECTS') {
            return this.target.api.getProjects();
        }
    }

    /**
     * ALL CUSTOM/OPTIONAL METHODS FOR AN INTEGRATION
     */
    async getSampleData() {
        const user = await this.target.api.getUser()
        console.log(JSON.stringify(user));
        const issues = (await user.assignedIssues()).nodes;
        const formatted = issues.map(issue =>
            _.pick(issue, ['id', 'title', 'priority','identifier', 'branchName', 'updatedAt', 'createdAt'])
        );
        console.log(formatted)
        return {data: formatted}

    }
}

module.exports = LinearIntegration;
