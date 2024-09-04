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
        res.render("error", { title: "Validation Error", statusCode: 400, message: "Bad Request", description: "The username and password must be strings with a minimum length of 3 characters.The email must be at least 6 characters long." })
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
        console.log(username, password);
        loginSchema.parse({ username, password });
        next();
    } catch (e) {
        res.render("error", { title: "Validation Error", statusCode: 400, message: "Bad Request", description: "The username and password must be strings with a minimum length of 3 characters."})
    }
}

module.exports = {
    signupValidation,
    loginValidation,
}

