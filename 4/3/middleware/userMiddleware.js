const { User } = require("../db");

function UserMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    User.findOne({
        username: username,
        password: password,
    }).then((user) => {
        if (user) {
            next();
        } else {
            res.status(401).send('Unauthorized User');
        }
    })

}

module.exports = UserMiddleware;