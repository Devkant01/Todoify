const express = require("express");
const authRouter = require("./user");
const crudRouter = require("./todos");
const router = express.Router();

router.use("/user", authRouter);
router.use("/todos", crudRouter);

module.exports = router;
