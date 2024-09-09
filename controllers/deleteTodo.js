const { todosModel } = require("../models/todosModel");

async function deleteTodo(req, res, next) {
    const id = req.params.id;
    const todoExists = await todosModel.findOne({ _id: id });
    if (!todoExists) {
        return res.render("error", { title: "Todo Not Found", statusCode: 404, message: "Todo Not Found", description: "The todo you are trying to delete doesn't exist on database." })
    }
    await todosModel.deleteOne({ _id: id })
    res.status(200).json({
        msg: "Todo deleted"
    });
    next();
}

module.exports = {
    deleteTodo
}