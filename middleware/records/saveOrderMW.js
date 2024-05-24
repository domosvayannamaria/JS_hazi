/**
 * Save added information about order, add to the records list
 */

const requireOption = require('../requireOption');

module.exports = function (objectRepository) {
    const OrderModel = requireOption(objectRepository, 'OrderModel');
    const FlowerModel = requireOption(objectRepository, 'FlowerModel');

    return function (req, res, next) {
        if (
            typeof req.body.customerID === 'undefined' ||
            typeof req.body.flower_name === 'undefined' ||
            typeof req.body.amount === 'undefined' ||
            typeof req.body.price === 'undefined' ||
            typeof req.body.cust_name === 'undefined' ||
            typeof req.body.phone === 'undefined' ||
            typeof req.body.address === 'undefined'
        ) {
            return next();
        }
        // Ellenőrizzük, hogy a megadott customerID már szerepel-e az adatbázisban
        OrderModel.findOne({ customerID: req.body.customerID })
            .then((existingOrder) => {
                if (existingOrder) {
                    // Ha már létezik rendelés ezzel a customerID-vel, akkor hibaüzenetet küldünk vissza
                    res.locals.errorMessage = 'Customer ID already exists';
                    return res.render('add_order', { order: req.body, errorMessage: res.locals.errorMessage });
                } else {
                    // Ha nincs még ilyen customerID az adatbázisban, folytatjuk a rendelés mentését
                    // Ellenőrizzük, hogy a kiválasztott virág szerepel-e az inventory-ban
                    FlowerModel.findOne({ flower_name: req.body.flower_name })
                        .then((flower) => {
                            if (!flower) {
                                const err = new Error('Selected flower not found in inventory');
                                err.status = 400;
                                throw err;
                            }

                            if (flower.flower_amount <= 0) {
                                res.locals.errorMessage = 'Selected flower is not available';
                                return res.render('add_order', { order: req.body, errorMessage: res.locals.errorMessage });
                            }

                            // Virág szerepel az inventory-ban, így mentjük a rendelést
                            if (typeof res.locals.order === 'undefined') {
                                res.locals.order = new OrderModel();
                            }

                            res.locals.order.customerID = req.body.customerID;
                            res.locals.order.flower_name = req.body.flower_name;
                            res.locals.order.amount = req.body.amount;
                            res.locals.order.price = req.body.price;
                            res.locals.order.cust_name = req.body.cust_name;
                            res.locals.order.phone = req.body.phone;
                            res.locals.order.address = req.body.address;

                            // Ellenőrizzük, hogy a rendelés mennyisége kevesebb-e, mint a virág rendelkezésre álló mennyisége
                            if (res.locals.order.amount > flower.flower_amount) {
                                res.locals.errorMessage = 'Ordered quantity exceeds available quantity';
                                return res.render('add_order', { order: req.body, errorMessage: res.locals.errorMessage });
                            } else {
                                // Ha a mennyiség nem haladja meg a rendelkezésre álló mennyiséget, akkor mentjük a rendelést
                                return res.locals.order.save()
                                    .then(() => {
                                        // A rendelés sikeres mentése esetén frissítjük a virág mennyiségét
                                        return FlowerModel.findOneAndUpdate(
                                            { flower_name: req.body.flower_name },
                                            { $inc: { flower_amount: -res.locals.order.amount } }
                                        );
                                    });
                            }
                        })
                        .then(() => {
                            // Check if the updated flower amount is 0, if so, delete the flower from the database
                            if (req.body.flower_amount === 0) {
                                return FlowerModel.findOneAndDelete({ flower_name: req.body.flower_name });
                            }
                        })
                        .then(() => {
                            if (!res.headersSent) { // Ellenőrizzük, hogy már elküldtük-e a válasz fejlécét
                                return res.redirect('/menu/records'); // Átirányítás csak akkor, ha még nem küldtük el a válasz fejlécét
                            }
                        })
                        .catch((err) => {
                            return next(err); // Hibakezelés
                        });
                }
            })
            .catch((err) => {
                return next(err); // Hibakezelés
            });
    };
};
