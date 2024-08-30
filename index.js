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
    res.render("home");
})

app.get('/features', (req, res)=>{
    res.render("features");
})

app.listen(port, () => {
    console.log(`Server is active on localhost://${port}`);
 })