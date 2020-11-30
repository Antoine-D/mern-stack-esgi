const jwt = require("jsonwebtoken");
const secret = require("../config/keys").secret;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403).json( "Unauthorized" );
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401).json( {message: 'User not logged in'} );
    }
};