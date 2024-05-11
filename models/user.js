/**
 * User model
 * @type {Schema}
 */

const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    username: String,
    password: String // For simplicity, storing passwords directly. In real-world scenarios, always hash passwords before storing.
});

module.exports = User;
