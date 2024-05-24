/**
 * Gets the whole list of flowers in the inventory
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const FlowerModel = requireOption(objectRepository, 'FlowerModel');

    return function (req, res, next) {
        FlowerModel.find({})
            .then(inventory => {
                res.locals.inventory = inventory;

                if (res.locals.inventory.length === 0) {
                    res.locals.noFlowers = 'Egy virág sem található.';
                }
                return next();
            })
            .catch(err => {
                return next(err);
            });
    };
};
