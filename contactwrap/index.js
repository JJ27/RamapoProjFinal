require('dotenv').config();
const Database = require('dbcmps369');

class ContactDB {
    constructor() {
        this.db = new Database();
    }

    async initialize() {
        await this.db.connect();

        await this.db.schema('Contacts', [
            { name: 'id', type: 'INTEGER' },
            { name: 'fname', type: 'TEXT' },
            { name: 'lname', type: 'TEXT' },
            { name: 'phone', type: 'TEXT' },
            { name: 'email', type: 'TEXT' },
            { name: 'street', type: 'TEXT' },
            { name: 'city', type: 'TEXT' },
            { name: 'state', type: 'TEXT' },
            { name: 'zip', type: 'TEXT' },
            { name: 'country', type: 'TEXT' },
            { name: 'contact_email', type: 'INTEGER' },
            { name: 'contact_phone', type: 'INTEGER' },
        ], 'id');

        await this.db.schema('Users', [
            { name: 'id', type: 'INTEGER' },
            { name: 'fname', type: 'TEXT' },
            { name: 'lname', type: 'TEXT' },
            { name: 'username', type: 'TEXT' },
            { name: 'password', type: 'TEXT' },
        ], 'id');
        /*
        const incomplete = await this.db.read('Contact', [{ column: 'complete', value: false }]);
        for (const g of incomplete) {
            await this.db.delete('Guess', [{ column: 'gameId', value: g.id }]);
            await this.db.delete('Game', [{ column: 'id', value: g.id }]);
        }*/
    }

    //TODO: Update below functions to work with the new schema

    async createGame(secret, userId) {
        const id = await this.db.create('Game', [
            { column: 'secret', value: secret },
            { column: 'time', value: new Date() },
            { column: 'complete', value: false },
            { column: 'num_guesses', value: 0 },
            { column: 'userId', value: userId }
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

    async findGame(id, userId) {
        const games = await this.db.read('Game', [{ column: 'id', value: id }, { column: 'userId', value: userId }]);
        if (games.length > 0) return games[0];
        else {
            return undefined;
        }
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

    async recordGuess(game, guess) {
        await this.db.update('Game',
            [{ column: 'num_guesses', value: (game.num_guesses + 1) }],
            [{ column: 'id', value: game.id }]
        );

        await this.db.create('Guess',
            [
                { column: 'gameId', value: game.id },
                { column: 'time', value: new Date() },
                { column: 'value', value: guess }
            ]
        );
    }

    async complete(game) {
        await this.db.update('Game',
            [{ column: 'complete', value: true }],
            [{ column: 'id', value: game.id }]
        );
    }

    async findContacts() {
        const c = await this.db.read('Contacts', []);
        return c;
    }

    async findGuesses(gameId) {
        const game_guesses = await this.db.read('Guess', [{ column: 'gameId', value: gameId }]);
        return game_guesses;
    }
}

module.exports = ContactDB;