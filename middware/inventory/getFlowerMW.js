const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const FlowerModel = requireOption(objectRepository, 'FlowerModel');

    return function (req, res, next) {
        FlowerModel.findOne({_id: req.params.flowerID}, (err, flower)=> {
            if(err || !flower){
                return next(err);
            }

            res.locals.flower = flower;
            return next();
        });
    };
};
