/**
 * save added information about order, add to the records list
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const OrderModel = requireOption(objectRepository, 'OrderModel');

    return function (req, res, next) {
        if(typeof req.body.customerID === 'undefined' || typeof req.body.flower_name === 'undefined'
            || typeof req.body.amount === 'undefined' || typeof req.body.price == 'undefined'
            || typeof req.body.cust_name == 'undefined' || typeof req.body.phone == 'undefined'
            || typeof req.body.address == 'undefined'
        ){
            return next();
        }

        if(typeof res.locals.order === 'undefined'){
            res.locals.order = new OrderModel();
        }

        res.locals.order.customerID = req.body.customerID;
        res.locals.order.flower_name = req.body.flower_name;
        res.locals.order.amount = req.body.amount;
        res.locals.order.price = req.body.price;
        res.locals.order.cust_name = req.body.cust_name;
        res.locals.order.phone = req.body.phone;
        res.locals.order.address = req.body.address;

        res.locals.order
            .save()
            .then(() => {
                return res.redirect('/menu/records');
            })
            .catch((err) => {
                return next(err);
            });
    };
};
