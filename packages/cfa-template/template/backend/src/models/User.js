const mongoose = require('mongoose');
const { Base, createModel } = require('@friggframework/models');

const collectionName = 'User';

const _schema = Base.Schema.clone();

const _model = createModel(collectionName, _schema);

class User extends Base {
    static Schema = _schema;

    static Model = _model;

    constructor(model = _model, schema = _schema) {
        super(model, schema);
    }
}

module.exports = User;
