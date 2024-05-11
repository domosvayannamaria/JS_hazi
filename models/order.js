/**
 * Order model
 * @type {Schema}
 */

const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Order = db.model('Order', {
    customerID: Number,
    flower_name: String,
    amount: Number,
    price: Number,
    cust_name: String,
    phone: Number,
    address: String
});

module.exports = Order;