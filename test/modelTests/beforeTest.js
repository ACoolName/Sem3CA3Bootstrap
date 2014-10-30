var mockDb = require('./mockDb');

beforeEach(function (done) {
    mockDb.initializeDB();
    return done();
});
