const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");


async function searchTodo(req, res, next) {
    const { text } = req.body;
    try {
        const str = req.headers.authorization;
        const token = str.split(" ")[1];
        const user = jwt.verify(token, jwt_secret_key);
        const todos = await todosModel.find({ userId: user.userId });
        var count = 0;
        var reqTodo = [];
        todos.map((t) => {
            if (t.title.includes(text)) {
                count++;
                reqTodo.push(t);
            }
        });
        (count == 0) ? reqTodo.push("No todo found") : reqTodo;
        res.json({
            count: count,
            todo: reqTodo
        });
        next();
    } catch (e) {
        res.status(400).json({
            msg: "wrong token"
        })
    }
}

module.exports = {
    searchTodo
}