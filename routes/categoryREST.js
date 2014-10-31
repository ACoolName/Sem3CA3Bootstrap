var rest = require("./abstractREST");
category = new rest.ExpressREST('../models/categories',
    '../helperClasses/errorHandler');
category.produce();
module.exports = category.router;
