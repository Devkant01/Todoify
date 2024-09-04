const { userModel } = require('../models/userModel');

async function createUser(req, res, next) {
    const { username, email, password } = req.body;
    const userExists = await userModel.findOne({ username });
    if (userExists) {
        return res.render("error", { title: "Conflict", statusCode: 409, message: "User Already Exists", description: "The username you entered is already taken. Please try logging in or use a different username to sign up." })
    }
    const create = await userModel.create({
        username,
        email,
        password
    })
    create.save();
    next();
}

module.exports = { createUser };