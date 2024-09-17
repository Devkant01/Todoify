const zod = require("zod");

const todosSchema = zod.object({
    title: zod.string().min(2, "add todo title"),
    description: zod.string().min(0)
})

// Middleware to validate the input for creating a new todo
async function todosValidation(req, res, next) {
    const { title, description } = req.body;
    try {
        todosSchema.parse({ title, description });
        next();
    } catch (e) {
        res.render("error", { title: "Invalid input", statusCode: 400, message: "Invalid input", description: "Please enter a valid title and description" });
    }
}

module.exports = {
    todosValidation
}