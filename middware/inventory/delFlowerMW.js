/**
 * delete flower, remove from the list of inventory
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const orderId = req.params.flowerID;
        res.redirect('/menu/inventory');
    };
};