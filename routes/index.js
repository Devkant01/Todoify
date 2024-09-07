const express = require("express");
const authRouter = require("./user");
const crudRouter = require("./todos");
const { postUserCredentials, getUserCredentials } = require("../controllers/userCredentials");
const router = express.Router();

router.use("/user", authRouter);
router.use("/todos", crudRouter);

// router.get("/", getUserCredentials);
router.post("/", postUserCredentials)
router.get("/", getUserCredentials)
module.exports = router;
