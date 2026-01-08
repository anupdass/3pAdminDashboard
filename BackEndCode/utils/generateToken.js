const jwt = require('jsonwebtoken');

const generateToken = (id, role = []) => {
    // console.log("Generating token with roles:", role);
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
        // { expiresIn: "1h" }
    );
};

module.exports = generateToken;
