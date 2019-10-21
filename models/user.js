const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'users.json'
);

const getUserFromFile = callback => {
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            return callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.id = Math.random().toString();
    }

    save() {
        getUserFromFile(users => {
            users.push(this);
            fs.writeFile(p, JSON.stringify(users, null, 2), (err) => {
                console.log(err);
            });
        });
    }
};