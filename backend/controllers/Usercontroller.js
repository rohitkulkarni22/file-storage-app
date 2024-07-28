const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const generateToken = require("../utils/genratetoken");

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required",
                success: false
            });
        }

        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            username,
            password: hashPassword
        });

        res.status(201).json({
            message: "User created successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Username or password are incorrect",
                success: false
            });
        }

        // Login success
        const token = generateToken(user);
        res.status(200).cookie("token", token, { httpOnly: true }).json({
            message: `Welcome back ${user.username}`,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.status(200).clearCookie("token").json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser };
