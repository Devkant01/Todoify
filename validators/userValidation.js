const zod = require("zod");

// for signup
const signupSchema = zod.object({
    username: zod.string().min(3, "Incorrect username"),
    email: zod.string().email().min(6, "Invalid email"),
    password: zod.string().min(3)
})

function signupValidation(req, res, next) {
    const { username, email, password } = req.body;
    try {
        signupSchema.parse({ username, email, password });
        next();
    } catch (e) {
        res.status(400).json({
            msg: "Input error"
        })
    }
}

// for login
const loginSchema = zod.object({
    username: zod.string().min(3, "incorrect username"),
    password: zod.string()
})

function loginValidation(req, res, next) {
    const { username, password } = req.body;
    try {
        loginSchema.parse({ username, password });
        next();
    } catch (e) {
        res.status(400).json({
            msg: "Input error",
        })
    }
}

module.exports = {
    signupValidation,
    loginValidation,
}

