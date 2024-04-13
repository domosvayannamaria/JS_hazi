/**
 * delete the order, including customer information, remove from the records list
 */

// delOrderMW middleware
module.exports = function (objectRepository) {
    return function (req, res, next) {
        const orderId = req.params.customerID;
        res.redirect('/menu/records');
    };
};
