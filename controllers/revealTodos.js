const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");

async function revealTodos(req, res, next) {
    const str = req.headers.authorization;
    const token = str.split(" ")[1];
    try {
        const user = jwt.verify(token, jwt_secret_key);
        const todos = await todosModel.find({ userId: user.userId });
        res.status(300).json({
            todos
        })
        next();
    } catch (e) {
        return res.status(403).json({
            msg: "UnAuthorized user"
        })
    }
}

module.exports = {
    revealTodos
}