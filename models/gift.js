const fs = require('fs');
const path = require('path');

const gitsFilePath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'gifts.json'
);

const getGiftsFromFile = callback => {
    fs.readFile(gitsFilePath, (error, fileContent) => {
        if (error) {
            return callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Gift {
    constructor(id, name, details, quantity) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.quantity = quantity;
        // this.id = Math.random().toString();
    }

    save() {
        this.id = Math.random().toString();
        getGiftsFromFile(gifts => {
            gifts.push(this);
            fs.writeFile(gitsFilePath, JSON.stringify(gifts), (err) => {
                console.log(err);
            });
        });
    };

    update() {
        getGiftsFromFile(gifts => {
            const existingGift = gifts.findIndex(gift => gift.id === this.id);
            const updatedGifts = [...gifts];
            updatedGifts[existingGift] = this;
            fs.writeFile(gitsFilePath, JSON.stringify(updatedGifts), (err) => {
                console.log(err);
            });
        });
    }

    static deleteById(id) {
        getGiftsFromFile(gifts => {
            const updatedGifts = gifts.filter(gift => gift.id !== id);
            fs.writeFile(gitsFilePath, JSON.stringify(updatedGifts), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getGiftsFromFile(callback);
    }

    static findById(id, callback) {
        getGiftsFromFile(gifts => {
            const gift = gifts.find(gift => gift.id === id);
            callback(gift);
        });
    }
};