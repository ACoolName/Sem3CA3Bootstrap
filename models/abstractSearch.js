function createFindOneFunc(object, searchByName) {
    return function (id, callback) {
        var condition = {};
        condition[searchByName || "_id"] = id;
        object.findOne(condition, function (err, entity) {
            if (err) {
                return callback(err);
            }
            callback(null, entity);
        });
    };
}

function createFindFunc(object, searchByName) {
    return function (callbackOrId, callback) {
        var condition = {};
        console.log(callbackOrId);
        if (callback) {
            condition[searchByName || "_id"] = callbackOrId;
        } else {
            callback = callbackOrId;
        }
        console.log(condition);
        object.find(condition, function (err, entities) {
            if (err) {
                return callback(err);
            }
            callback(null, entities);
        });
    };
}

module.exports = {
    createFindOneFunc: createFindOneFunc,
    createFindFunc: createFindFunc
};