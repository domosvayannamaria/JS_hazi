/**
 * Saves the new user to the database
 */

const { createHash } = require('crypto');
const requireOption = require("../requireOption");

module.exports = function (objectRepository) {
    return function (req, res, next) {
        const UserModel = requireOption(objectRepository, 'UserModel');
        const username = req.body.username;
        const password = req.body.password;

        // Check if username and password are provided
        if (!username || !password) {
            res.locals.error = 'Missing username or password';
            res.render({errorMessage: res.locals.errorMessage });
            return next();
        }

        // Hash the password
        const hashedPassword = hash(password);

        // Check if the user exists
        UserModel.findOne({ username: username })
            .then(user => {
                if (user) {
                    // User already exists
                    res.locals.error = 'User already exists';
                    return next();
                } else {
                    // User does not exist, create a new user
                    const newUser = new UserModel({
                        username: username,
                        password: hashedPassword
                    });
                    req.body.unknownUser=false;
                    // Save the new user into the database
                    return newUser.save()
                        .then(() => {
                            return next();
                        })
                        .catch(err => {
                            console.error('Error saving user:', err);
                            return next();
                        });
                }
            })
            .catch(err => {
                console.error('Error:', err);
                return next();
            });
    };
};

function hash(string) {
    return createHash('sha256').update(string).digest('hex');
}
