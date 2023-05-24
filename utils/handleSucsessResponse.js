const handleSucsessResponse = (res, status, data) => { res.status(status).send(data); };

module.exports = { handleSucsessResponse };
