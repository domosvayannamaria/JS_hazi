/**
 * Checks if the password is correct,
 * if it's ok, set session values and redirect to /menu
 * if it's wrong, set error message
 */

const { createHash } = require('crypto');
const requireOption = require("../requireOption");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const UserModel = requireOption(objectRepository, 'UserModel');
        const username = req.body.username;
        const password = req.body.password;
        res.locals.unknownUser=false;
        // Check if username and password are provided
        if (!username || !password) {
            res.locals.error = 'Missing username or password';
            return next();
        }

        // Hash the password
        const hashedPassword = hash(password);

        // Check if the user exists
        UserModel.findOne({ username: username })
            .then(user => {
                if (user) {
                    // User exists, check password
                    if (user.password === hashedPassword) {
                        // Password matches, set session values and redirect to /menu
                        req.session.login = true;
                        req.session.username = req.body.username;
                        return req.session.save((err) => {
                            if (err) {
                                console.error('Error saving session:', err);
                                res.locals.error = 'An error occurred';
                                return next();
                            }
                            res.locals.unknownUser=false;
                            return res.redirect('/menu');
                        });
                    } else {
                        // Password does not match
                        res.locals.errorMessage = 'Incorrect password';
                        res.render('login', { order: req.body, errorMessage: res.locals.errorMessage });
                    }
                } else {
                    res.locals.unknownUser=true;
                    return next();
                }
            })
            .catch(err => {
                console.error('Error:', err);
                res.locals.error = 'An error occurred';
                return next();
            });
    };
};

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}
