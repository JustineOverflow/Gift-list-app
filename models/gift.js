const database = require('../util/database');

module.exports = class Gift {
    constructor(name, details, quantity) {
        this.name = name;
        this.details = details;
        this.quantity = quantity;
        // this.id = Math.random().toString();
    }

    save() {
        return database.execute('INSERT INTO gifts.gifts (name, details, quantity) VALUES (?, ?, ?)',
            [this.name, this.details, this.quantity]
        );
    };

    update() {
        database.execute('INSERT INTO gifts.gifts (name, details, quantity) VALUES (?, ?, ?)',
            [this.name, this.details, this.quantity]
        );
    };

    static deleteById(id) {
    }

    static fetchAll() {
        return database.execute('SELECT * FROM gifts.gifts');
    }

    static findById(id) {
        return database.execute('SELECT * FROM gifts.gifts WHERE gifts.id = ?', [id]);
    }
};