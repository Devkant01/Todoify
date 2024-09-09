const express = require("express");
const { loginValidation, signupValidation } = require("../validators/userValidation");
const { createUser } = require("../controllers/createUser");
const { checkUser } = require("../controllers/checkUser");
const { signupAuth, loginAuth } = require("../middleware/userAuth");
const router = express.Router();

router.get('/', (req, res) => { res.send("Hello users, go for login/signup"); });

router.post('/login', loginValidation, checkUser, loginAuth);

router.post('/signup', signupValidation, createUser, signupAuth);

module.exports = router;
