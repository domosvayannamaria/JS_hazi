/**
 * save added information about customer, add to the order
 */

module.exports = function ( objectrepository ) {
    return function (req, res, next) {
        if(typeof req.body.cust_name === 'undefined' || typeof req.body.phone === 'undefined' ||
            typeof req.body.address === 'undefined'
        ){
            return next();
        }

        console.log(req.body);

        res.redirect('/menu/records');
        next();
    };
};