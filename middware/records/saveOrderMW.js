/**
 * save added information about order, add to the records list
 */

module.exports = function ( objectrepository ) {
    return function (req, res, next) {
        if(typeof req.body.customerID === 'undefined' || typeof req.body.flower_name === 'undefined'
            || typeof req.body.amount === 'undefined' || typeof req.body.price == 'undefined'
        ){
            return next();
        }

        console.log(req.body);

        res.redirect('/menu/records');
        next();
    };
};