const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");
const { adminModel } = require("../models/admin");
const { route } = require("../routes");

async function todosAdded(req, res, next) {
    try {
        const title = req.body.title;
        // const token = req.session.token; //not using express-session
        const token = await adminModel.findOne({ admin: "dev" }, { token: 1, _id: 0 });
        const user = jwt.verify(token, jwt_secret_key);
        await todosModel.findOne({ userId: user.userId, title });
        res.redirect("/todoify");
        return;
    } catch (error) {
        res.render("error", {route: "/todoify" ,title: "Todo already exists", statusCode: 400, message: "Todo already exists", description: "Please enter a different todo", btnMsg: "BACK TO DASHBOARD" });
    }
}

module.exports = {
    todosAdded
}