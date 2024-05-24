/**
 * Gets the information about one specific flower
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const FlowerModel = requireOption(objectRepository, 'FlowerModel');

    return function (req, res, next) {
        FlowerModel.findOne({ _id: req.params.flower_id })
            .then((flower) => {
                if (!flower) {
                    return next(); //not covered by test yet
                }
                res.locals.flower = flower;
                next();
            })
            .catch((err) => {
                return next(err); //not covered by test yet
            });
    };
};
