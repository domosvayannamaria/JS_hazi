/**
 * Get information about one specific order
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const OrderModel = requireOption(objectRepository, 'OrderModel');

    return function (req, res, next) {
        OrderModel.findOne({ _id: req.params.order_id })
            .then((order) => {
                if (!order) {
                    const err = new Error('Order not found');
                    err.status = 404;
                    throw err;
                }
                res.locals.order = order;
                next();
            })
            .catch((err) => {
                next(err);
            });
    };
};

