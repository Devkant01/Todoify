const { userModel } = require('../models/userModel');

async function checkUser(req, res, next) {
    const { username, password } = req.body;

    try {
        const userExists = await userModel.findOne({ username });

        if (!userExists) {
            return res.status(404).json({
                title: "User Not Found",
                statusCode: 404,
                message: "User Not Found",
                description: "The username you entered does not exist in our records. Please check your username or sign up for a new account."
            });
        }

        if (userExists.password !== password) {
            return res.status(401).json({
                title: "Invalid Credentials",
                statusCode: 401,
                message: "Unauthorized",
                description: "The password you entered is incorrect. Please try again or reset your password if you've forgotten it."
            });
        }

        next();
    } catch (error) {
        console.error('Error in checkUser middleware:', error);
        res.status(500).json({
            title: "Server Error",
            statusCode: 500,
            message: "An unexpected error occurred",
            description: "Please try again later."
        });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await userModel.find({});
        return res.json({
            users
        });
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        return res.status(500).json({
            title: "Server Error",
            statusCode: 500,
            message: "An unexpected error occurred",
            description: "Please try again later."
        });
    }
}

module.exports = { checkUser, getAllUsers };
