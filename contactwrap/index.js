require('dotenv').config();
const Database = require('dbcmps369');
const bcrypt = require("bcryptjs");

class ContactDB {
    constructor() {
        this.db = new Database();
    }

    async initialize() {
        await this.db.connect();

        await this.db.schema('Contacts', [
            { name: 'id', type: 'INTEGER' },
            { name: 'nameprefix', type: 'TEXT' },
            { name: 'fname', type: 'TEXT' },
            { name: 'lname', type: 'TEXT' },
            { name: 'latitude', type: 'TEXT' },
            { name: 'longitude', type: 'TEXT' },
            { name: 'phone', type: 'TEXT' },
            { name: 'email', type: 'TEXT' },
            { name: 'street', type: 'TEXT' },
            { name: 'city', type: 'TEXT' },
            { name: 'state', type: 'TEXT' },
            { name: 'zip', type: 'TEXT' },
            { name: 'country', type: 'TEXT' },
            { name: 'contact_email', type: 'INTEGER' },
            { name: 'contact_phone', type: 'INTEGER' },
            { name: 'contact_mail', type: 'INTEGER' },
        ], 'id');

        await this.db.schema('Users', [
            { name: 'id', type: 'INTEGER' },
            { name: 'fname', type: 'TEXT' },
            { name: 'lname', type: 'TEXT' },
            { name: 'username', type: 'TEXT' },
            { name: 'password', type: 'TEXT' },
        ], 'id');
        const us = await this.db.read('Users', [{ column: 'username', value: 'cmps369' }]);
        if(us.length === 0) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync('rcnj', salt);
            this.createUser('cmps369', hash, 'Scott', 'Frees');
        }
    }
    //add createContact function
    async createContact(nameprefix, fname, lname, latitude, longitude, phone, email, street, city,state,zip,country, contact_email, contact_phone, contact_mail) {
        const id = await this.db.create('Contacts', [
            { column: 'nameprefix', value: nameprefix },
            { column: 'fname', value: fname },
            { column: 'lname', value: lname },
            { column: 'latitude', value: latitude },
            { column: 'longitude', value: longitude },
            { column: 'phone', value: phone },
            { column: 'email', value: email },
            { column: 'street', value: street },
            { column: 'city', value: city },
            { column: 'state', value: state },
            { column: 'zip', value: zip },
            { column: 'country', value: country },
            { column: 'contact_email', value: contact_email },
            { column: 'contact_phone', value: contact_phone },
            { column: 'contact_mail', value: contact_mail },
        ])
        return id;
    }

    async createUser(username, password, fname, lname) {
        const id = await this.db.create('Users', [
            { column: 'fname', value: fname },
            { column: 'lname', value: lname },
            { column: 'username', value: username },
            { column: 'password', value: password },
        ])
        return id;
    }

    async findUserByUsername(username) {
        const us = await this.db.read('Users', [{ column: 'username', value: username }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    async findUserById(id) {
        const us = await this.db.read('Users', [{ column: 'id', value: id }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    async findContact(id) {
        const c = await this.db.read('Contacts', [{ column: 'id', value: id }]);
        if (c.length > 0) return c[0];
        else {
            return undefined;
        }
    }

    //deleteContact function
    async deleteContact(id) {
        await this.db.delete('Contacts', [{ column: 'id', value: id }]);
    }

    //updateContact function
    async updateContact(id, nameprefix, fname, lname, latitude, longitude, phone, email, street, city,state,zip,country, contact_email, contact_phone, contact_mail) {
        await this.db.update('Contacts',
            [
                { column: 'nameprefix', value: nameprefix },
                { column: 'fname', value: fname },
                { column: 'lname', value: lname },
                { column: 'latitude', value: latitude },
                { column: 'longitude', value: longitude },
                { column: 'phone', value: phone },
                { column: 'email', value: email },
                { column: 'street', value: street },
                { column: 'city', value: city },
                { column: 'state', value: state },
                { column: 'zip', value: zip },
                { column: 'country', value: country },
                { column: 'contact_email', value: contact_email },
                { column: 'contact_phone', value: contact_phone },
                { column: 'contact_mail', value: contact_mail },
            ],
            [{ column: 'id', value: id }]
        );
    }

    async findContacts() {
        const c = await this.db.read('Contacts', []);
        return c;
    }
}

module.exports = ContactDB;