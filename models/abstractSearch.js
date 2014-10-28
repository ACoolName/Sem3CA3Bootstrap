function createSearchAllFunc(object) {
    return function (callback) {
        object.find({}, function (err, entities) {
            if (err) {
                return callback(err);
            }
            callback(null, entities);
        });
    };
}

function createSearchOneWithIdFunc(object) {
    return function (id, callback) {
        object.findOne({_id: id}, function (err, entity) {
            if (err) {
                return callback(err);
            }
            callback(null, entity);
        });
    };
}

function createSearchOneFunc(object, searchByName) {
    return function (id, callback) {
        var condition = {};
        condition[searchByName] = id;
        object.findOne(condition, function (err, entity) {
            if (err) {
                return callback(err);
            }
            callback(null, entity);
        });
    };
}

function createSearchSeveralFunc(object, searchByName) {
    return function (id, callback) {
        var condition = {};
        condition[searchByName] = id;
        object.find(condition, function (err, entities) {
            if (err) {
                return callback(err);
            }
            callback(null, entities);
        });
    };
}

module.exports = {
    createSearchAllFunc: createSearchAllFunc,
    createSearchOneWithIdFunc: createSearchOneWithIdFunc,
    createSearchOneFunc: createSearchOneFunc,
    createSearchSeveralFunc: createSearchSeveralFunc
};