const express = require('express');
const session = require('express-session');

const Database = require('./contactwrap');
const db = new Database();
db.initialize();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.locals.pretty = true;

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

app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = {
            id: req.session.user.id,
            email: req.session.user.email,
            fname: req.session.user.fname,
            lname: req.session.user.lname
        }
    }
    next()
})


app.set('view engine', 'pug');
//TODO: Update below express uses to work with the new routes
app.use('/', require('./routes/accounts'));
app.use('/', require('./routes/main'));

app.listen(8080, () => {
    console.log('Server running on port 8080')
});