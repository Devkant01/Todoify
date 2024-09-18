const jwt = require("jsonwebtoken");
const moment = require("moment");
const { jwt_secret_key } = require("../config/config");
const { todosModel } = require("../models/todosModel");
const { adminModel } = require("../models/admin");

async function todayTodos(req, res, next) {
    try {
        // const token = req.session.token; //not using express-session anymore
        const { token } = await adminModel.findOne({ admin: "dev" }, { token: 1, _id: 0 });
        res.locals.moment = moment; //for accessing moment library on frontend
        const user = jwt.verify(token, jwt_secret_key);
        const todos = await todosModel.find({ userId: user.userId });
        const completedTodos = await todosModel.find({ userId: user.userId, completed: true });
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();
        const todayTodos = await todosModel.find({
            userId: user.userId,
            createdOn: {
                $gte: startOfDay,
                $lt: endOfDay
            }
         });
        res.render("main", { username: user.username, count: todos.length, todos: todayTodos, todayTodos: todayTodos, completedCount: completedTodos.length });
        return;
    } catch (e) {
        res.render("error", { title: "Log in again/Session Expired", statusCode: 401, message: "Your session has expired", description: "Please log in again to continue. If you encounter further issues, contact support." })
    }
}

async function allTodayTodos(req, res, next) {
    try {
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();
        const todayTodos = await todosModel.find({
            createdOn: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });
        return res.json({ 
            status: "success",
            todayTodos: todayTodos.map(todo => {
                return {
                    id: todo._id,
                    userId: todo.userId,
                    title: todo.title
                }
            })
        });
    } catch (e) {
        res.render("error", { title: "Log in again/Session Expired", statusCode: 401, message: "Your session has expired", description: "Please log in again to continue. If you encounter further issues, contact support." })
    }
}

module.exports = {
    todayTodos,
    allTodayTodos
}