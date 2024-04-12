/**
 * Checks if the password is correct,
 * if it's ok, set session values and redirect to /menu
 * if it's wrong, set error message
 */

module.exports = function ( objectrepository ) {
    return function (req, res, next) {
        return next();
    };
};