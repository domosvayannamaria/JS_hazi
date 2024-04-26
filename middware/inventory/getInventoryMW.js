const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const FlowerModel = requireOption(objectRepository, 'FlowerModel');

    return function (req, res, next) {
        if(typeof  res.locals.order === 'undefined'){
            return next();
        }

        FlowerModel.find({flowerID: res.locals.flowerID}, (err, flowers)=> {
            if(err){
                return next(err);
            }

            res.locals.inventory = flowers;

            if (res.locals.inventory.length === 0){
                res.locals.noFlowers = 'Nincsenek virágok az adatbázisban.'
            }
            return next();
        });
    };
};
