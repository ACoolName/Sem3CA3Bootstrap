var rest = require("./abstractREST");
employee = new rest.ExpressREST('../models/employee',
    '../helperClasses/errorHandler');
employee.produce();
module.exports = employee.router;
