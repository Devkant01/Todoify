const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");

async function addTodo(req, res, next) {
    const { title, description } = req.body;
    const token = req.session.token;
    try {
        const user = jwt.verify(token, jwt_secret_key);
        const todo = await todosModel.create({
            userId: user.userId,
            title,
            description
        });
        todo.save();
        next();
    } catch (e) {
        res.render("error", { title: "Invalid token", statusCode: 400, message: "Invalid token", description: "Please log in again to continue" });
    }
}

module.exports = {
    addTodo
}