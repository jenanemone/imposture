const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const logger = require('morgan');
const connectDB = require('./config/database');

const mainRoutes = require('./routes/main');
const practiceRoutes = require("./routes/practice");
const vaultRoutes = require('./routes/vault');

// env config
require('dotenv').config( { path: './config/.env' } );

// passport config
require ('./config/passport')(passport);

// connect to database
connectDB();

// handlebars helpers
const { formatDate, stripTags, editIcon, truncate, select } = require('./helpers/hbs');

// set handlebars for viewing
app.engine('.hbs', exphhbs.engine( { helpers: {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select
}, defaultLayout: 'Main', extname: '.hbs' } ) );
app.set('view engine', '.hbs');

// For connection
let store = MongoStore.create({
    client: mongoose.connection.getClient()
});

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store
} ) );


// Passport middleware
app.use(passport.initialize() );
app.use(passport.session() );

// Set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folder
app.use( express.static( path.join( __dirname, "public" ) ) );

// Routes
app.use('/', require('./routes/index') );
app.use('/auth', require('./routes/auth') );
app.use('/stories', require('./routes/practice') );
app.use('/vault', require ('./routes/vault') );

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`) );