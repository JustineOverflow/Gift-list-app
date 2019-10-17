const Gift = require('../models/gift');

exports.getCreate = (request, response, next) => {
    response.render('admin/create', {
        pageTitle: 'Add a gift',
        path: '/admin/myList.ejs',
    });
};

exports.postCreate = (request, response, next) => {
    const gift = new Gift(request.body.name);
    gift.save();
    response.redirect('/admin/myList');
};

exports.getList = (request, respond, next) => {
    Gift.fetchAll(gifts => {
        respond.render('admin/myList', {
            gifts: gifts,
            pageTitle: 'My list',
            path: '/admin/myList.ejs',
            hasGifts: gifts.length > 0,
        });
    });
};

exports.getCart = (request, response, next) => {
    response.render('admin/cart', {
        pageTitle: "cart",
        path: '/admin/cart.ejs',
    });
};

