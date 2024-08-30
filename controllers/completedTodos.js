const jwt = require('jsonwebtoken');
const { jwt_secret_key } = require('../config/config');
const { todosModel } = require("../models/todosModel");

async function completedTodos(req, res, next) {
    try {
        const str = req.headers.authorization;
        const token = str.split(" ")[1];
        const user = jwt.verify(token, jwt_secret_key);
        const todos = await todosModel.find({ userId: user.userId });
        if (todos.length === 0) {
            return res.status(400).json({
                msg: "No todos found"
            });
        }
        const completedTodos = todos.filter(todo => todo.completed === true);
        res.status(300).json({
            msg: "Completed todos",
            completedTodos
        });
        next();
    } catch (e) {
        return res.status(403).json({
            msg: "UnAuthorized user"
        });
    }
}

module.exports = {
    completedTodos
}