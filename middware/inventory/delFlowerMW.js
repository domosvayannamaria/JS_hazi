/**
 * delete flower, remove from the list of inventory
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if(typeof  res.locals.flower === 'undefined'){
            return next();
        }

        // Törli a virághoz tartozó összes rendelést
        res.locals.records.forEach(function (order){
            order.remove((err)=>{
                if(err){
                    return next(err);
                }
            });
        });

        res.locals.flower.remove((err)=>{
            if(err){
                return next(err);
            }
            return res.redirect('/menu/inventory');
        });

    };
};