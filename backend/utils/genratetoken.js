const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const tokendata = { id: user._id };
    const secretkey = "ffhjghJGHGHGHHJH"; // Ideally, this should come from an environment variable
    const token = jwt.sign(tokendata, secretkey, { expiresIn: "1h" });
    return token;
};

module.exports = generateToken;
