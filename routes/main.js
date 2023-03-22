const express = require('express');
const session = require('express-session');
const router = express.Router();

router.get('/', async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const contacts = await req.db.findContacts();
    res.render('home', { contacts: contacts });
});

//create a new contact
router.get('/create', async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    res.render('create');
});

router.post('/create', async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const fname = req.body.fname.trim();
    const lname = req.body.lname.trim();
    const phone = req.body.phone.trim();
    const email = req.body.email.trim();
    const street = req.body.street.trim();
    const city = req.body.city.trim();
    const state = req.body.state.trim();
    const zip = req.body.zip.trim();
    const country = req.body.country.trim();
    const contact_by_phone = req.body.contact_by_phone !== undefined;
    const contact_by_email = req.body.contact_by_email !== undefined;
    const contact_by_mail = req.body.contact_by_mail !== undefined;
    const id = await req.db.createContact(fname, lname, phone, email, street, city, state, zip, country, contact_by_email, contact_by_phone, contact_by_mail);
    res.redirect('/');
});

//contact info page for each contact ID
router.get('/:contactId', async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const contact = await req.db.findContact(req.params.contactId);
    res.render('contactinfo', { contact: contact });
});

const logged_in_only = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Not Authorized");
    }
}

//edit contact info page for each contact ID
router.get('/:contactId/delete', logged_in_only, async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const contact = await req.db.findContact(req.params.contactId);
    res.render('delete', { contact: contact });
});

router.post('/:contactId/delete', logged_in_only, async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    await req.db.deleteContact(req.params.contactId);
    res.redirect('../');
});

router.get('/:contactId/edit', logged_in_only, async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const contact = await req.db.findContact(req.params.contactId);
    res.render('edit', { contact: contact });
});

router.post('/:contactId/edit', logged_in_only, async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const fname = req.body.fname.trim();
    const lname = req.body.lname.trim();
    const phone = req.body.phone.trim();
    const email = req.body.email.trim();
    const street = req.body.street.trim();
    const city = req.body.city.trim();
    const state = req.body.state.trim();
    const zip = req.body.zip.trim();
    const country = req.body.country.trim();
    const contact_by_phone = req.body.contact_by_phone !== undefined;
    const contact_by_email = req.body.contact_by_email !== undefined;
    const contact_by_mail = req.body.contact_by_mail !== undefined;
    await req.db.updateContact(req.params.contactId, fname, lname, phone, email, street, city, state, zip, country, contact_by_email, contact_by_phone, contact_by_mail);
    res.redirect('../'+req.params.contactId);
});

module.exports = router;