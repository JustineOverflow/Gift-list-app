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

module.exports = class gift {
    constructor(name) {
        this.name = name;
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
};