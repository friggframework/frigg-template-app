const mongoose = require('mongoose');

module.exports = {
    dropCollection: async (mongoose) => {
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        collections
            .map((collection) => collection.name)
            .forEach(async (collectionName) => {
                db.dropCollection(collectionName);
            });
    },
};
