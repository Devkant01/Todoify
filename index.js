const express = require("express");
require("dotenv").config();

const rootRouter = require("./routes/index");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use('/todoist', rootRouter);

app.get('/', (req, res) => {
    res.render("main");
    // res.send("Good to go");
})

app.get('/features', (req, res) => {
    res.render("features");
})

app.get('/login', (req, res) => {
    res.render("login");
})
app.get('/signup', (req, res) => {
    res.render("signup");
})

app.listen(port, () => {
    console.log(`Server is active on localhost:${port}`);
})