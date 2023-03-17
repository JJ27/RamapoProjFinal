const express = require('express');
const session = require('express-session');

const Database = require('contactwrap');
const db = new Database();
db.initialize();

const app = express();
app.use(express.urlencoded({ extended: true }));

// Gets call on every request, before the routes.
// We can inject dependencies into the req (or res)
// so the routes have access to them.
app.use((req, res, next) => {
    console.log("Adding DB to request");
    req.db = db;
    next();
})

app.use(session({
    secret: 'proj2',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

//TODO: Update below use to work with new User object
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = {
            id: req.session.user.id,
            email: req.session.user.email
        }
    }
    next()
})

app.set('view engine', 'pug');
//TODO: Update below express uses to work with the new routes
/*
app.use('/', require('./routes/accounts'));
app.use('/', require('./routes/play'));
app.use('/history', require('./routes/history'));
 */

app.listen(8080, () => {
    console.log('Server is running  on port 8080')
});