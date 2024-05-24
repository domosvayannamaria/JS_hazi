/**
 * Get the data of records, put it into the table
 */
const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const OrderModel = requireOption(objectRepository, 'OrderModel');

    return function (req, res, next) {
        OrderModel.find({})
            .then(records => {
                res.locals.records = records;

                if (res.locals.records.length === 0) {
                    res.locals.noRecords = 'Egy rekord sem található.';
                }
                return next();
            })
            .catch(err => {
                return next(err);
            });
    };
};
