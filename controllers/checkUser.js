const { userModel } = require('../models/userModel');

async function checkUser(req, res, next) {
    const { username, password } = req.body;
    const userExists = await userModel.findOne({ username });
    if (!userExists) {
        return res.render("error", { title: "User Not Found", statusCode: 404, message: "User Not Found", description: "The username you entered does not exist in our records. Please check your username or sign up for a new account." })
    }
    
    if (userExists.password !== password) {
        return res.render("error", { title: "Invalid Credentials", statusCode: 401, message: "Unauthorized", description: "The password you entered is incorrect. Please try again or reset your password if you've forgotten it." })
    }

    next();
}

module.exports = { checkUser };