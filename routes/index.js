const express = require("express");
const authRouter = require("./user");
const crudRouter = require("./todos");
const { getUserCredentials } = require("../controllers/userCredentials");
const router = express.Router();

router.use("/user", authRouter);
router.use("/todos", crudRouter);

// router.get("/", getUserCredentials);
router.get("/", getUserCredentials)
module.exports = router;
