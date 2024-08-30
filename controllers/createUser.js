const { userModel } = require('../models/userModel');

async function createUser(req, res, next) {
    const { username, email, password } = req.body;
    const userExists = await userModel.findOne({ username });
    if (userExists) {
        return res.status(409).json({
            msg: "User already exists"
        })
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