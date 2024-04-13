/**
 * saves the added information about a flower, adds to the list of inventory
 */

module.exports = function ( objectrepository ) {
    return function (req, res, next) {
        if(typeof req.body.flower_name === 'undefined' || typeof req.body.flower_amount === 'undefined' ||
            typeof req.body.flower_price === 'undefined'
        ){
            return next();
        }

        console.log(req.body);

        res.redirect('/menu/inventory');
        next();
    };
};