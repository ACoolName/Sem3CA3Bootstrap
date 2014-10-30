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
        if (callback) {
            condition[searchByName || "_id"] = callbackOrId;
        } else {
            callback = callbackOrId;
        }
        object.find(condition, function (err, entities) {
            if (err) {
                return callback(err);
            }
            callback(null, entities);
        });
    };
}

function createUpdateFunc(object){
    return function (obj, callback) {
        object.update({_id: obj._id},
		      {$set: obj},
		      function (err, entities) {
			  if (err) {
			      return callback(err);
			  }
			  callback(null, entities);
		      });
    };
}

function createExportObject(object){
    return {all: createFindFunc(object),
	    get: createFindOneFunc(object),
	    update: createUpdateFunc(object)}
}

module.exports = {
    createFindOneFunc: createFindOneFunc,
    createFindFunc: createFindFunc,
    createUpdateFunc: createUpdateFunc,
    createExportObject: createExportObject
};
