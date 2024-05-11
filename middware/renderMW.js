/**
 * Using the template engine render the values into the template*/

module.exports = function (objectRepository, viewName) {
    return function (req, res) {
        res.locals.username = req.session.username;
        res.render(viewName, res.locals);
    };
};