const Gift = require('../models/gift');

exports.getCreate = (request, response, next) => {
    response.render('admin/create', {
        pageTitle: 'Add a gift',
        path: '/admin/myList.ejs',
    });
};

exports.postCreate = (request, response, next) => {
    const name = request.body.name;
    const details = request.body.details;
    const quantity = request.body.quantity;
    const gift = new Gift(name, details, quantity);
    gift.save();
    response.redirect('/admin/myList');
};

exports.getList = (request, response, next) => {
    Gift.fetchAll(gifts => {
        response.render('admin/myList', {
            gifts: gifts,
            pageTitle: 'My list',
            path: '/admin/myList.ejs',
            hasGifts: gifts.length > 0,
        });
    });
};

exports.getGift = (request, response, next) => {
    const giftID = request.params.giftId;
    console.log(Gift.findById(giftID, gift => {
        response.render('admin/edit', {
            gift: gift,
            path: '/admin/myList',
        });
    }));
};

exports.getCart = (request, response, next) => {
    response.render('admin/cart', {
        pageTitle: "cart",
        path: '/admin/cart.ejs',
    });
} ;

