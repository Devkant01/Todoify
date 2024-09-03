const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
const { jwt_secret_key } = require("../config/config");

async function signupAuth(req, res, next) {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ username });
    const token = jwt.sign({ userId: user._id, username }, jwt_secret_key);
    res.status(201).json({
        msg: "User created",
        token: token
    })
    next();
}

async function loginAuth(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        const token = jwt.sign({ userId: user._id, username }, jwt_secret_key, {expiresIn: "10s"});
        // res.json({
        //     msg: "User Logged In",
        //     token: token
        // })
        // res.send(`Logged in, your token: ${token}`);
        res.redirect('/todoify');
        next();
    } catch (e) {
        res.send("Something wrong happened")
    }

}

module.exports = {
    signupAuth,
    loginAuth
};