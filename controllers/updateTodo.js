const { todosModel } = require("../models/todosModel");

async function updateTodo(req, res, next) {
    const id = req.params.id;
    console.log(id);
    try {
        const todoExist = await todosModel.findOne({ _id: id });
        await todosModel.updateOne({ _id: id },
            {
                $set: {
                    completed: !todoExist.completed
                }
            });
        res.status(200).json({
            msg: "Todo updated"
        });
        next();
    } catch (e) {
        return res.status(404).json({
            msg: "Todo not found"
        });
    }
}

module.exports = {
    updateTodo
}