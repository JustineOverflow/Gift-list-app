const path = require('path');

const express = require('express');

const adminControllers = require('../controllers/admin');

const router = express.Router();

//admin/create => GET

router.get('/create', adminControllers.getCreate);

//admin/create => POST

router.post('/create', adminControllers.postCreate);

//admin/cart => GET

router.get('/cart', adminControllers.getCart);

//admin/myList => GET

router.get('/myList', adminControllers.getList);

//admin/productID => GET

router.get('/:giftId', adminControllers.getGift);

//admin/create/id => GET

router.get('/edit/:giftId', adminControllers.getEdit);

router.post('/edit', adminControllers.postEdit);

//admin/delete => GET

router.post('/delete', adminControllers.postDelete);

module.exports = router;

