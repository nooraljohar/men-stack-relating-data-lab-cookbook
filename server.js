const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const session = require("express-session")
const passUsertoView = require('./middleware/pass-user-to-view');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");


// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";

//database connection
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB Database: ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
 app.use(passUsertoView)
//require Controllers 
const authCtrl = require("./controllers/auth");
const isSignedIn = require("./middleware/is-signed-in");
const passUserToView = require('./middleware/pass-user-to-view.js');
const recipeCtrl = require("./controllers/recipes");
const ingredientsCtrl = require("./controllers/ingredients");





//use controllers 
app.use(passUserToView);
app.use("/auth",authCtrl);
app.use(isSignedIn);
app.use("/recipes",recipeCtrl);
app.use("/ingredients",ingredientsCtrl);


//Root Route
app.get("/", async (req,res) => {
    res.render("index.ejs")
})
// rout for testing
// VIP-LOUNG
app.get("/Vip-lounge", isSignedIn, (req,res) => {
    res.send(`welcom to the party ${req.session.user.username}`);
});

app.listen(port, () => {
  console.log(`Auth app is Listening for requets on port  ${port}!`);
});
