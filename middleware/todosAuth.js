const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");

async function todosAdded(req, res, next) {
    try {
        const title = req.body.title;
        const str = req.headers.authorization;
        const token = str.split(" ")[1];
        const user = jwt.verify(token, jwt_secret_key);
        const todo = await todosModel.findOne({ userId: user.userId, title });
        res.status(201).json({
            msg: "todo created",
            todo: {
                _id: todo._id,
                title: todo.title,
                description: todo.description,
                completed: todo.completed
            }
        });
        next();
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}

module.exports = {
    todosAdded
}