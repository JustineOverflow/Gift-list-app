const Gift = require('../models/gift');

exports.getCreate = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        return response.redirect('/login');
    }
    response.render('admin/create', {
        pageTitle: 'Add a gift',
        path: '/admin/myList',
        editing: false,
        isAuthenticated : request.session.isLoggedIn,
    });
};

exports.postCreate = (request, response, next) => {
    const name = request.body.name;
    const details = request.body.details;
    const quantity = request.body.quantity;
    Gift.details({
        name: name,
        details: details,
        quantity: quantity,
    })
        .then(result => {
            console.log('Added gift');
            return response.redirect('myList')
        })
        .catch(error => {
            console.log(error)
        });
};

exports.getList = (request, response, next) => {
    Gift.findAll()
        .then(gifts => {
            response.render('admin/myList', {
                gifts: gifts,
                pageTitle: 'My list',
                path: '/admin/myList.ejs',
                isAuthenticated : request.session.isLoggedIn,
            });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getGift = (request, response, next) => {
    const giftId= request.params.giftId;
    Gift.findAll({where: {id: giftId} })
        .then(gifts => {
            response.render('admin/detail', {
                gift: gifts[0],
                path: '/admin/myList.ejs',
                isAuthenticated : request.session.isLoggedIn,
            });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getEdit = (request, response, next) => {
    const giftID = request.params.giftId;
    //console.log(Gift.findById(giftID, gift => {
    if (!giftID) {
            return response.redirect('admin/myList');
        }
    Gift.findByPk(giftID)
        .then(gift => {
            if (!gift) {
                return response.redirect('admin/myList');
            }
        response.render('admin/create', {
            gift: gift,
            path: '/admin/create',
            editing: true,
            isAuthenticated : request.session.isLoggedIn,
        });
    })
        .catch(error => console.log(error));
};

exports.postEdit = (request, response, next) => {
    const giftId = request.body.giftId;
    const updatedName = request.body.name;
    const updatedDetails = request.body.details;
    const updatedQuantity = request.body.quantity;
    Gift.findByPk(giftId)
        .then(gift => {
            gift.name = updatedName;
            gift.details = updatedDetails;
            gift.quantity = updatedQuantity;
            return gift.save();
        })
        .then( result => {
            console.log('Updated gift!')
            response.redirect('/admin/myList');
        })
        .catch(error => {
        console.log(error);
    });
};

exports.postDelete = (request, response, next) => {
    const giftId = request.body.giftId;
    Gift.findByPk(giftId)
        .then(gift => {
        return gift.destroy();
    })
        .then(result => {
            console.log('Gift deleted!');
            response.redirect('/admin/myList');
    })
        .catch(error => {
            console.log(error)
        });
};

exports.getCart = (request, response, next) => {
    response.render('admin/cart', {
        pageTitle: "cart",
        path: '/admin/cart',
        isAuthenticated : request.session.isLoggedIn,
    });
};

