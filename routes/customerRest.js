var rest = require("./abstractREST");
customer = new rest.ExpressREST('../models/customer',
    '../helperClasses/errorHandler');
customer.produce();
module.exports = customer.router;
