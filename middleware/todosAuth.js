const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");

async function todosAdded(req, res, next) {
    try {
        const title = req.body.title;
        const token = req.session.token;
        const user = jwt.verify(token, jwt_secret_key);
        await todosModel.findOne({ userId: user.userId, title });
        res.redirect("/todoify");
        return;
    } catch (error) {
        res.render("error", { title: "Todo already exists", statusCode: 400, message: "Todo already exists", description: "Please enter a different todo" });
    }
}

module.exports = {
    todosAdded
}