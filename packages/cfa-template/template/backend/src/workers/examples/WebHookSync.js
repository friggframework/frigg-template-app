const Worker = require('@friggframework/core/Worker.js');
const SyncManager = require('@friggframework/core/managers/LHSyncManager.js');

class WebHookSyncWorker extends Worker {
    constructor(params) {
        super(params);
    }

    async _run(params) {
        return SyncManager.webHookHandler(params.integration_id, params.obj);
    }

    async _validateParams(params) {
        this._verifyParamExists(params, 'integration_id');
        this._verifyParamExists(params, 'obj');
    }
}

module.exports = WebHookSyncWorker;
