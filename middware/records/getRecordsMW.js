/**
 * Get the data of records, put it into the table
 */
const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const OrderModel = requireOption(objectRepository, 'OrderModel');

    return function (req, res, next) {
        if(typeof  res.locals.order === 'undefined'){
            return next();
        }

        OrderModel.find({customerID: res.locals.order.customerID, flower_name: {$ne : undefined}}, (err, records)=> {
            if(err){
                return next(err);
            }

            res.locals.records = records;

            if (res.locals.records.length === 0){
                res.locals.noRecords = 'Egy rekord sem található ' + res.locals.order.cust_name + ' ügyfélnél.'
            }
            return next();
        });

    };
};
