const express = require("express");
const authRouter = require("./user");
const crudRouter = require("./todos");
const router = express.Router();

router.use("/user", authRouter);
router.use("/todos", crudRouter);

router.get("/", (req, res) => {
  res.render("main");
});
module.exports = router;
