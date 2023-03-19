const express = require('express');
const session = require('express-session');
const router = express.Router();

router.get('/', async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const contacts = await req.db.findContacts();
    res.render('home', { contacts: contacts });
});

module.exports = router;