const express = require("express");

const { todosValidation } = require("../validators/todosValidation");
const { addTodo } = require("../controllers/addTodo");
const { revealTodos } = require("../controllers/revealTodos");
const { updateTodo } = require("../controllers/updateTodo");
const { deleteTodo } = require("../controllers/deleteTodo");
const { completedTodos } = require("../controllers/completedTodos");
const { todosAdded } = require("../middleware/todosAuth");

const router = express.Router();

router.get('/', (req, res) => { res.send("Add some todos"); });

router.post('/todo', todosValidation, addTodo, todosAdded);
router.get('/todos', revealTodos);
router.get('/completed', completedTodos);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);
module.exports = router;