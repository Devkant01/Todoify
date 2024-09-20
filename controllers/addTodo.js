const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");
const { adminModel } = require("../models/admin");

async function addTodo(req, res, next) {
    try {
        const { title, description } = req.body;
        const token = req.session.token; //not using express-session anymore
        // const { token } = await adminModel.findOne({ admin: "dev" }, { token: 1, _id: 0 });
        const user = jwt.verify(token, jwt_secret_key);
        const todo = await todosModel.create({
            userId: user.userId,
            title,
            description
        });
        next();
    } catch (e) {
        res.render("error", { title: "Invalid token", statusCode: 400, message: "Invalid token", description: "Please log in again to continue" });
    }
}

module.exports = {
    addTodo
}
