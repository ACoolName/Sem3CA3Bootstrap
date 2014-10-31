var rest = require("./abstractREST");
products = new rest.ExpressREST('../models/product',
    '../helperClasses/errorHandler');
products.produce();
module.exports = products.router;