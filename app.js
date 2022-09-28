const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const ejs = require('ejs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require("express-flash");
const logger = require('morgan');
const connectDB = require('./config/database');

const mainRoutes = require('./routes/main');
const boardRoutes = require("./routes/dashboard");
const recordRoutes = require("./routes/record");

// env config
require('dotenv').config( { path: './config/.env' } );

// passport config
require ('./config/passport')(passport);

// connect to database
connectDB();

// Use EJS
app.set('view engine', 'ejs');

// Static folder
app.use( express.static( path.join( __dirname, "public" ) ) );

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

// Sessions
let store = MongoStore.create({
    client: mongoose.connection.getClient()
})
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store
} ) );

app.use(flash());

// Passport middleware
app.use(passport.initialize() );
app.use(passport.session() );

// Set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})


//Use forms for put / delete
app.use(methodOverride("_method"));

// Routes
app.use("/", mainRoutes);
app.use("/dashboard", boardRoutes);
app.use("/record", recordRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`) );