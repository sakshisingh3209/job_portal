const JWT = require('jsonwebtoken');
const userAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('bearer')) {
        next('Auth failed');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next()

    } catch (error) {
        next('Authentication failed');
    }

}
module.exports = userAuth;