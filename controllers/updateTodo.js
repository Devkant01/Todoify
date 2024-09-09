const { todosModel } = require("../models/todosModel");

async function updateTodo(req, res, next) {
    const id = req.params.id;
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
        return res.render("error", { title: "Todo Not Found", statusCode: 404, message: "Todo Not Found", description: "The todo you are trying to delete doesn't exist on database." })

    }
}

module.exports = {
    updateTodo
}