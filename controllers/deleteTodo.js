const { todosModel } = require("../models/todosModel");

async function deleteTodo(req, res, next) {
    const id = req.params.id;
    const todoExists = await todosModel.findOne({ _id: id });
    if (!todoExists) {
        return res.status(404).json({
            msg: "Todo not found"
        });
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