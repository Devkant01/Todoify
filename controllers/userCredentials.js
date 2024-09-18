const jwt = require("jsonwebtoken");
const moment = require("moment");
const { todosModel } = require("../models/todosModel");
const { adminModel } = require("../models/admin");
const { jwt_secret_key } = require("../config/config");

async function getUserCredentials(req, res, next) {
    try {
        // const token = req.session.token; //not using express-session anymore
        const { token } = await adminModel.findOne({ admin: "dev" }, { token: 1, _id: 0 });
        res.locals.moment = moment; //for accessing moment library on frontend
        const user = jwt.verify(token, jwt_secret_key);
        const todos = await todosModel.find({ userId: user.userId });
        const completedTodos = await todosModel.find({ userId: user.userId, completed: true });
        //fetching todays todos
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();
        const todayTodos = await todosModel.find({
            userId: user.userId,
            createdOn: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });
        res.render("main", { username: user.username, count: todos.length, todos: todos, todayTodos: todayTodos, completedCount: completedTodos.length });
    } catch (e) {
        res.render("error", { title: "Log in/Session Expired", statusCode: 401, message: "Your session has expired", description: "Please log in again to continue. If you encounter further issues, contact support." })
    }
}

module.exports = {
    getUserCredentials
}