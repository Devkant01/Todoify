const express = require("express");
require("dotenv").config();

const rootRouter = require("./routes/index");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.use('/todoify', rootRouter);

// path for login todoify/user/login
// path for signup todoify/user/signup
app.get('/', (req, res) => {
    res.render("home");
})

app.get('/features', (req, res) => {
    res.render("features");
})

app.get('/forTesting', (req, res) => {
    res.render("main");
})


app.listen(port, () => {
    console.log(`Server is active on localhost:${port}`);
})