const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
const { todosModel } = require("../models/todosModel");
const { jwt_secret_key } = require("../config/config");

async function signupAuth(req, res, next) {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.findOne({ username });
        const token = jwt.sign({ userId: user._id, username }, jwt_secret_key);
        req.session.token = token;
        const todos = await todosModel.find({ userId: user._id });
        const completedTodos = await todosModel.find({ userId: user._id, completed: true });
        res.render("main", { username: user.username, totalCount: todos.length, completedCount: completedTodos.length});
        next();
    } catch (e) {
        res.render("error", { title: "Internal Server Error", statusCode: 500, message: "Internal Server Error", description: "An unexpected error occurred on our server. Please try again by reloading the page or contact support if the issue persists." })
    }
}

async function loginAuth(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        const token = jwt.sign({ userId: user._id, username }, jwt_secret_key); // {expiresIn: '10s'} add at last
        req.session.token = token;
        const todos = await todosModel.find({ userId: user._id });
        const completedTodos = await todosModel.find({ userId: user._id, completed: true });
        res.render("main", { username: user.username, totalCount: todos.length, completedCount: completedTodos.length});
        next();
    } catch (e) {
        res.render("error", { title: "Internal Server Error", statusCode: 500, message: "Internal Server Error", description: "An unexpected error occurred on our server. Please try again by reloading the page or contact support if the issue persists." })
    }

}

module.exports = {
    signupAuth,
    loginAuth
};