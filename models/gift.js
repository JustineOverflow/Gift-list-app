const gifts= [];

const fs = require('fs');

const path = require('path');

module.exports = class gift {
    constructor(name) {
        this.name = name;
    }

    save() {
        const p = path.join(path.dirname(process.mainModule.filename),
            'data',
            'gifts.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let gifts = [];
            if (!err) {
               gifts = JSON.parse(fileContent);
           }
            gifts.push(this);
            fs.writeFile(p, JSON.stringify(gifts), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        const p = path.join(path.dirname(process.mainModule.filename),
            'data',
            'gifts.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
};