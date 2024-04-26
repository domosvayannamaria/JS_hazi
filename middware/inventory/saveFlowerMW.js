/**
 * saves the added information about a flower, adds to the list of inventory
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const FlowerModel = requireOption(objectRepository, 'FlowerModel');

    return function (req, res, next) {
        if( typeof req.body.flowerID === 'undefined' || typeof req.body.flower_name === 'undefined'
            || typeof req.body.flower_amount === 'undefined' || typeof req.body.flower_price === 'undefined') {
            return next();
        }

        if(typeof res.locals.flower === 'undefined'){
            res.locals.flower = new FlowerModel();
        }
        res.locals.flower.flowerID = req.body.flowerID;
        res.locals.flower.flower_name = req.body.flower_name;
        res.locals.flower.flower_amount = req.body.flower_amount;
        res.locals.flower.flower_price = req.body.flower_price;

        res.locals.flower.save((err)=>{
            if(err){
                return next(err);
            }

            res.redirect('/menu/inventory');
        });
    };
};
