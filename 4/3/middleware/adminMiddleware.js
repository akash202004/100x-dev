const { Admin } = require("../db/index");

function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    Admin.findOne({
        username: username,
        password: password
    }).then((admin) => {
        if (admin) {
            next();
        } else {
            res.status(401).send('Unauthorized Admin');
        }
    })

}

module.exports = adminMiddleware;