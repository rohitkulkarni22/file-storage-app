const jwt = require('jsonwebtoken');
const secretkey = "ffhjghJGHGHGHHJH";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            message: 'No token provided, authorization denied',
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, secretkey); 
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token, authorization denied',
            success: false
        });
    }
};

module.exports = authMiddleware;
