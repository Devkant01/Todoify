const express = require("express");

const { todosValidation } = require("../validators/todosValidation");
const { addTodo } = require("../controllers/addTodo");
const { updateTodo } = require("../controllers/updateTodo");
const { deleteTodo } = require("../controllers/deleteTodo");
const { todayTodos, allTodayTodos } = require("../controllers/todayTodos");
const { completedTodos } = require("../controllers/completedTodos");
const { pendingTodos } = require("../controllers/pendingTodos");
const { todosAdded } = require("../middleware/todosAuth");

const router = express.Router();

router.get('/', (req, res) => { res.send("Add some todos"); });

router.post('/todo', todosValidation, todosAdded, addTodo);
router.get('/completed', completedTodos);
router.get('/pending', pendingTodos);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);
router.get('/todayTodos', todayTodos);
router.get('/allTodayTodos', allTodayTodos);

module.exports = router;