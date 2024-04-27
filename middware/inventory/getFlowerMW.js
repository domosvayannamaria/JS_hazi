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
                    const err = new Error('Flower not found');
                    err.status = 404;
                    throw err;
                }
                res.locals.flower = flower;
                next();
            })
            .catch((err) => {
                next(err);
            });
    };
};
