/**
 * delete flower, remove from the list of inventory
 */

module.exports = function (objectRepository) {
    const FlowerModel = objectRepository.FlowerModel;
    const OrderModel = objectRepository.OrderModel;

    return function (req, res, next) {
        if(typeof res.locals.flower === 'undefined'){
            return next();
        }

        OrderModel.deleteMany({ flower_name: res.locals.flower.flower_name })
            .then(() => {
                return FlowerModel.findByIdAndDelete(res.locals.flower._id);
            })
            .then((removedFlower) => {
                if (!removedFlower) {
                    return next(new Error('Flower not found'));
                }
                return res.redirect('/menu/inventory');
            })
            .catch((err) => {
                return next(err);
            });
    };
};