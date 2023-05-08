const express = require('express');
const session = require('express-session');
const router = express.Router();
const geo = require("node-geocoder");

router.get('/', async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const contacts = await req.db.findContacts();
    res.render('home', { contacts: contacts});
});

//create a new contact
router.get('/create', async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    res.render('create');
});

router.post('/create', async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const nameprefix = req.body.prefixselector.trim();
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
    const geocoder = geo({ provider: 'openstreetmap' });
    const result = await geocoder.geocode(street + " " + city + ", " + state + " " + zip);
    if(result.length === 0) {
        const id = await req.db.createContact(String(nameprefix), fname, lname, '0', '0', phone, email, street, city,state,zip,country, contact_by_email, contact_by_phone, contact_by_mail);
    } else{
        const id = await req.db.createContact(String(nameprefix), fname, lname, String(result[0].latitude), String(result[0].longitude), phone, email, street, city,state,zip,country, contact_by_email, contact_by_phone, contact_by_mail);
    }
    //const id = await req.db.createContact(fname, lname, suffix, latitude, longitude, phone, email, street, city, state, zip, country, contact_by_email, contact_by_phone, contact_by_mail);
    res.redirect('/');
});

//contact info page for each contact ID
router.get('/:contactId/info', async (req, res) => {
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
    const nameprefix = req.body.prefixselector.trim();
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
    const geocoder = geo({ provider: 'openstreetmap' });
    const result = await geocoder.geocode(street + " " + city + ", " + state + " " + zip);
    if(result.length === 0) {
        const id = await req.db.updateContact(req.params.contactId, nameprefix, fname, lname, '0', '0', phone, email, street, city,state,zip,country, contact_by_email, contact_by_phone, contact_by_mail);
    } else{
        const id = await req.db.updateContact(req.params.contactId, nameprefix, fname, lname, String(result[0].latitude), String(result[0].longitude), phone, email, street, city,state,zip,country, contact_by_email, contact_by_phone, contact_by_mail);
    }
    //await req.db.updateContact(req.params.contactId, prefix, fname, lname, latitude, longitude, phone, email, street, city, state, zip, country, contact_by_email, contact_by_phone, contact_by_mail);
    res.redirect('../');
});

module.exports = router;