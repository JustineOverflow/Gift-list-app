const Gift = require('../models/gift');

exports.getCreate = (request, response, next) => {
    response.render('create.ejs', {
        pageTitle: 'Add a gift',
    });
};

exports.postCreate = (request, response, next) => {
    const gift = new Gift(request.body.name);
    gift.save();
    response.redirect('/');
};

exports.getList = (request, respond, next) => {
    Gift.fetchAll(gifts => {
        respond.render('myList', {
            gifts: gifts,
            docTitle: 'My list',
            path: '/',
            hasGifts: gifts.length > 0,
        });
    });
};
