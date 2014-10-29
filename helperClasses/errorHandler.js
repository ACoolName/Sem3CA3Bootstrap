function errorHandle(err, res) {
    if (err) {
        res.status(500).send({status: 500, message: err.message, type: 'internal'});
        res.end();
        return false;
    }
    return true;
}

module.exports = {
    errorHandle: errorHandle
};