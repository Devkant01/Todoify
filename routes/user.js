const express = require("express");
const { loginValidation, signupValidation } = require("../validators/userValidation");
const { createUser } = require("../controllers/createUser");
const { checkUser, getAllUsers } = require("../controllers/checkUser");
const { signupAuth, loginAuth } = require("../middleware/userAuth");
const { logsOut } = require("../controllers/logsOut");
const router = express.Router();

router.get('/', (req, res) => { res.send("Hello users, go for login/signup"); });

// Route to get all users
router.get('/allusers', getAllUsers);

router.post('/login', loginValidation, checkUser, loginAuth);

router.post('/signup', signupValidation, createUser, signupAuth);

router.get('/logout', logsOut);

module.exports = router;
