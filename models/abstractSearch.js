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

function createUpdateFunc(object){
    return function (obj, callback) {
	var id = obj._id;
	delete obj._id;
        object.update({_id: id},
		      {$set: obj},
		      function (err, numAffected) {
			  if (err) {
			      return callback(err);
			  }
			  callback(null, numAffected);
		      });
    };
}

function createDeleteFunc(object){
    return function (id, callback) {
        object.findOneAndRemove({_id: id},
		      function (err, doc) {
			  if (err) {
			      return callback(err);
			  }
			  callback(null, doc);
		      });
    };
}

function createExportObject(object){
    return {all: createFindFunc(object),
	    get: createFindOneFunc(object),
	    update: createUpdateFunc(object),
	    del: createDeleteFunc(object)}
}

module.exports = {
    createFindOneFunc: createFindOneFunc,
    createFindFunc: createFindFunc,
    createUpdateFunc: createUpdateFunc,
    createDeleteFunc: createDeleteFunc,
    createExportObject: createExportObject
};
