const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const rootRouter = require("./routes/index");
const { session_secret } = require("./config/config")

const app = express();
const port = 3000;

app.enable('trust proxy')
app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use('/todoify', rootRouter);

app.get('/', (req, res) => {
    res.render("home");
})

app.get('/features', (req, res) => {
    res.render("features");
})

app.get('*', (req, res) => {
    res.status(404).render("error", {title: "Page Not Found", statusCode: 404, message: "Oops! The page you're looking for doesn't exist.", description: "The URL you entered may be incorrect, or the page has been moved. Please check the URL or go back to the homepage."
    });

})


app.listen(port, () => {
    console.log(`Server is active on localhost:${port}`);
})

module.exports = app;
