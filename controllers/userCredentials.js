const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
const { todosModel } = require("../models/todosModel");
const { jwt_secret_key } = require("../config/config");

async function getUserCredentials(req, res, next) {
    try {
        const token = req.session.token;
        console.log(req.session.token);
        console.log("Get request");
        const decodeUser = jwt.verify(token, jwt_secret_key);
        const user = await userModel.findOne({ _id: decodeUser.userId });
        const todos = await todosModel.find({ userId: user._id });
        const completedTodos = await todosModel.find({ userId: user._id, completed: true });
        res.render("main", { username: user.username, totalCount: todos.length, completedCount: completedTodos.length});
        next();
    } catch (e) {
        res.render("error", { title: "Log in again/Session Expired", statusCode: 401, message: "Your session has expired", description: "Please log in again to continue. If you encounter further issues, contact support." })
    }
}

module.exports = {
    getUserCredentials
}