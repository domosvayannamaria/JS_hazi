/**
 * get information about one specific order
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.order = {
            customerID: '1',
            flower_name: 'Roses',
            amount: '10',
            price: '$100',
            cust_name: 'John Doe',
            phone: '123-456-7890',
            address: '123 Main St'
        };
        return next();
    };
};
