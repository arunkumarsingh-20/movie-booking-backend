const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    // DEBUGGING LOGS
    console.log("Header received:", req.headers.authorization); 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // DEBUGGING LOG
            console.log("Token extracted:", token); 
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // DEBUGGING LOG
            console.log("Decoded ID:", decoded.id);

            req.user = await User.findByPk(decoded.id);
            next();
        } catch (error) {
            console.error("Token verification failed:", error.message); // Will tell us the exact error
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log("No token found in header");
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };