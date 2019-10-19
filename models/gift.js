const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'gifts.json'
);

const getGiftsFromFile = callback => {
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            return callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Gift {
    constructor(name, details, quantity) {
        this.name = name;
        this.details = details;
        this.quantity = quantity;
        this.id = Math.random().toString();
    }

    save() {
        getGiftsFromFile(gifts => {
            gifts.push(this);
            fs.writeFile(p, JSON.stringify(gifts), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getGiftsFromFile(cb);
    }

    static findById(id, callback) {
        getGiftsFromFile(gifts => {
            const gift = gifts.find(p => p.id === id);
            callback(gift);
        });
    }
};