const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const Database = require('./contactwrap');
const db = new Database();
db.initialize();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.locals.pretty = true;

app.use((req, res, next) => {
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
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/', require('./routes/accounts'));
app.use('/', require('./routes/main'));
app.use('/contacts', require('./routes/extras'));

app.listen(8080, () => {
    console.log('Server running on port 8080')
});