const { userModel } = require('../models/userModel');

async function checkUser(req, res, next) {
    const { username, password } = req.body;
    const userExists = await userModel.findOne({ username });
    if (!userExists) {
        return res.status(400).json({
            msg: "User not exist"
        })
    }
    
    if (userExists.password !== password) {
        return res.status(401).json({
            msg: "Invalid password"
        });
    }

    next();
}

module.exports = { checkUser };