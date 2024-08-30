const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
const { jwt_secret_key } = require("../config/config");

async function signupAuth(req, res, next) {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ username });
    const token = jwt.sign({ userId: user._id, username, password }, jwt_secret_key);
    res.status(201).json({
        msg: "User created",
        token: token
    })
    next();
}

async function loginAuth(req, res, next) {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    const token = jwt.sign({ userId: user._id, username, password }, jwt_secret_key);
    res.json({
        msg: "User Logged In",
        token: token
    })
    next();

}

module.exports = {
    signupAuth,
    loginAuth
};