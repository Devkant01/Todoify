const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");
const { adminModel } = require("../models/admin");

async function todosAdded(req, res, next) {
    try {
        const title = req.body.title;
        const token = req.session.token;
        // const token = await adminModel.findOne({ admin: "dev" }, { token: 1, _id: 0 });
        const user = jwt.verify(token, jwt_secret_key);
        const todo = await todosModel.findOne({ userId: user.userId, title });
        if (todo) {
            throw new Error("Todo already exists");
        }
        next();
    } catch (error) {
        res.render("error", {route: "/todoify" ,title: error.message, statusCode: 400, message: "Todo already exists", description: "Please enter a different todo", btnMsg: "BACK TO DASHBOARD" });
    }
}

module.exports = {
    todosAdded
}
