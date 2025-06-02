global.jwt = require('jsonwebtoken');

global.generateToken = (user) => {
    return jwt.sign(
        { id: user.userId || null, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY
    );
};