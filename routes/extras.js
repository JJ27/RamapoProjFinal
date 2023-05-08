const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    const userId = req.session.user ? req.session.user.id : -1;
    const contacts = await req.db.findContacts();
    res.json({contacts: contacts});
});

module.exports = router;