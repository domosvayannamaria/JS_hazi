/**
 * Flower model
 * @type {Schema}
 */

const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Flower = db.model('Flower', {
    flowerID: Number,
    flower_name: String,
    flower_amount: Number,
    flower_price: Number
});

module.exports = Flower;