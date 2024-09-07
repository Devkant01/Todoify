const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
const { todosModel } = require("../models/todosModel");
const { jwt_secret_key } = require("../config/config");

async function postUserCredentials(req, res, next) {
    try {
        const { authorization } = req.body;
        console.log(authorization);
        const token = authorization.split(" ")[1];
        req.session.token = token;
        res.redirect('/todoify')
        next();
    } catch (e) {
        res.render("error", { title: "Internal Server Error", statusCode: 500, message: e, description: "An unexpected error occurred on our server. Please try again by reloading the page or contact support if the issue persists." })
    }
}
async function getUserCredentials(req, res, next) {
    try {
        const token = req.session.token;
        console.log(" get ", token);
        const decodeUser = jwt.verify(token, jwt_secret_key);
        const user = await userModel.findOne({ _id: decodeUser.userId });
        const todos = await todosModel.find({ userId: user._id });
        const completedTodos = await todosModel.find({ userId: user._id, completed: true });
        res.render("main", { username: user.username, totalCount: todos.length, completedCount: completedTodos.length, token: `Bearer ${token}` });
        next();
    } catch (e) {
        res.render("error", { title: "Internal Server Error", statusCode: 500, message: e, description: "An unexpected error occurred on our server. Please try again by reloading the page or contact support if the issue persists." })
    }
}

module.exports = {
    postUserCredentials,
    getUserCredentials
}