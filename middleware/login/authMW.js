/**
 * If the user is not logged in, redirects to /
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if(typeof req.session.login === 'undefined' || req.session.login !== true){
            return res.redirect('/');
        }
        next();
    };
};