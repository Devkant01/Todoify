
const express = require("express");
const path = require("path");
// const session = require("express-session");
require("dotenv").config();

const rootRouter = require("./routes/index");
// const { session_secret } = require("./config/config")

const app = express();
const port = 3000;


/*app.set('trust proxy', 1);
app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', //add NODE_ENV=development to .env file
             maxAge: 60 * 60 * 1000 }
}))
*/

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

/**
 * This is the main entry point for the Todoify application.
 * 
 * The application uses Express.js to handle routing and middleware.
 * 
 * Note: During development, `express-session` works fine, but in production (e.g., when deployed on Vercel),
 * the session expires after 1-2 authentications, leading to a session expired error page.
 * 
 * To test `express-session`, uncomment the session-related code in all controller `.js` files and comment out the `adminModel` code.
 * Additionally, uncomment the `express-session` code in this file.
 * 
 * The application serves static files from the "public" directory and uses EJS as the view engine.
 * 
 * Routes:
 * - `/`: Renders the home page.
 * - `/features`: Renders the features page.
 * - `*`: Renders a 404 error page for any undefined routes.
 * 
 * The server listens on port 3000.
 */
