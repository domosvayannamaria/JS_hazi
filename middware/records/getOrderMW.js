/**
 * get information about one specific order
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const OrderModel = requireOption(objectRepository, 'OrderModel');

    return function (req, res, next) {
        OrderModel.findOne({
            _id: req.params.customerID
        },(err,order)=> {
            if (err || !order) {
                return next(err);
            }

            res.locals.order = order;
            return next();
        });
    };
};

