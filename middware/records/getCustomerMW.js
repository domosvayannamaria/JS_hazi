/**
 * get information about the customer of the order
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.customer = [
            {
                cust_name: 'John Doe',
                phone: '123-456-7890',
                address: '123 Main St'
            }
        ];
        return next();
    };
};
