const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");

async function addTodo(req, res, next) {
    const { title, description } = req.body;
    const str = req.header("authorization");
    const token = str.split(" ")[1];
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
        res.status(400).json({
            msg: "wrong token"
        })
    }
}

module.exports = {
    addTodo
}