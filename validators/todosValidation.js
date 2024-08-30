const zod = require("zod");

const todosSchema = zod.object({
    title: zod.string().min(2, "add todo title"),
    description: zod.string().min(0)
})

async function todosValidation(req, res, next) {
    const { title, description } = req.body;
    try {
        todosSchema.parse({ title, description });
        next();
    } catch (e) {
        res.status(400).json({
            msg: "invalid input"
        })
    }
}

module.exports = {
    todosValidation
}