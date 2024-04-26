/**
 * delete the order, including customer information, remove from the records list
 */

// delOrderMW middleware
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if(typeof  res.locals.order === 'undefined'){
            return next();
        }

        res.locals.order.remove((err)=>{
            if(err){
                return next(err);
            }
            return res.redirect('/order/' + res.locals.customerID);
        });
    };
};