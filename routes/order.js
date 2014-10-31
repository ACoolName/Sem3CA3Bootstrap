var rest = require("./abstractREST");
orders = new rest.ExpressREST('../models/orders',
			      '../helperClasses/errorHandler');
orders.produce();
module.exports = orders.router;
