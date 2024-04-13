/**
 * get the information about one flower
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.flower = {
            flower_name: 'Dahlias',
            flower_amount: '10',
            flower_price: '$5.00'
        };
        return next();
    };
};
