/**
 * If the user wants to log out, deletes the session
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        req.session.destroy((err)=> {
            res.redirect('/');
        });
    };
};