const Gift = require('../models/gift');

exports.getCreate = (request, response, next) => {
    response.render('admin/create', {
        pageTitle: 'Add a gift',
        path: '/admin/myList',
        editing: false,
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
        response.render('admin/detail', {
            gift: gift,
            path: '/admin/myList',
        });
    }));
};

exports.getEdit = (request, response, next) => {
    const giftID = request.params.giftId;
    console.log(Gift.findById(giftID, gift => {
        if (!gift) {
            return response.redirect ('admin/myList');
        }
        response.render('admin/create', {
            gift: gift,
            path: '/admin/create',
            editing: true,
        });
    }));

};

exports.postEdit = (request, response, next) => {
    const giftId = request.body.giftId;
    const updatedName = request.body.name;
    const updatedDetails = request.body.details;
    const updatedQuantity = request.body.quantity;
    const updatedGift = new Gift(
        giftId,
        updatedName,
        updatedDetails,
        updatedQuantity
    );

    updatedGift.update();
    response.redirect('/admin/myList');

};

exports.postDelete = (request, response, next) => {
    const giftId = request.body.giftId;
    Gift.deleteById(giftId);
    response.redirect('/admin/myList');
};

exports.getCart = (request, response, next) => {
    response.render('admin/cart', {
        pageTitle: "cart",
        path: '/admin/cart',
    });
};

