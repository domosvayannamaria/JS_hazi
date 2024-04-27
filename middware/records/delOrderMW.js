/**
 * Delete the order, remove from the records list
 */

// delOrderMW middleware
module.exports = function (objectRepository) {
    const OrderModel = objectRepository.OrderModel;

    return function (req, res, next) {
        if(typeof res.locals.order === 'undefined'){
            return next();
        }

        OrderModel.findByIdAndDelete(res.locals.order._id)
            .then((removedOrder) => {
                if (!removedOrder) {
                    return next(new Error('Order not found'));
                }
                return res.redirect('/menu/records');
            })
            .catch((err) => {
                return next(err);
            });
    };
};