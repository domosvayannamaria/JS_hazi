/**
 * Checks if the password is correct,
 * if it's ok, set session values and redirect to /menu
 * if it's wrong, set error message
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined') {
            return next();
        }

        if (req.body.password === 'rosy' || req.body.username === 'rosy') {
            req.session.login = true;
            return req.session.save((err => {
                return res.redirect('/menu');
            }))

        }

        res.locals.error = 'Hibás jelszó!';
        return next();
    };
};