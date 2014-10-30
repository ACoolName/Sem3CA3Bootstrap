function createFindOneFunc(object, searchByName) {
    return function (id, callback) {
        var condition = {};
        condition[searchByName || "_id"] = id;
        object.findOne(condition, function (err, entity) {
            err ? callback(err) : callback(null, entity);
        });
    };
}

function createFindFunc(object, searchByName) {
    return function (callbackOrId, callback) {
        var condition = {};
        if (callback) {
            condition[searchByName || "_id"] = callbackOrId;
        } else {
            callback = callbackOrId;
        }
        object.find(condition, function (err, entities) {
            err ? callback(err) : callback(null, entities);
        });
    };
}

function createUpdateFunc(object) {
    return function (obj, callback) {
        var id = obj._id;
        delete obj._id;
        object.update({_id: id},
            {$set: obj},
            function (err, numAffected) {
                err ? callback(err) : callback(null, numAffected);
            });
    };
}

function createDeleteFunc(object) {
    return function (id, callback) {
        object.findOneAndRemove({_id: id},
            function (err, doc) {
                err ? callback(err) : callback(null, doc);
            });
    };
}

function createExportObject(object, extraList) {
    var functions = {all: createFindFunc(object),
        get: createFindOneFunc(object),
        update: createUpdateFunc(object),
        del: createDeleteFunc(object)};
    if(!extraList) return functions;

    extraList.forEach(function (e) {
        var func = e.singleSearch ?
            createFindOneFunc(object, e.idType) : createFindFunc(object, e.idType);
        functions[e.functionName] = func;
    });
    return functions;
}

module.exports = {
    createFindOneFunc: createFindOneFunc,
    createFindFunc: createFindFunc,
    createUpdateFunc: createUpdateFunc,
    createDeleteFunc: createDeleteFunc,
    createExportObject: createExportObject
};
