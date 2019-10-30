const path = require('path');

const express = require('express');

const adminControllers = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/create', isAuth, adminControllers.getCreate);

router.post('/create', isAuth, adminControllers.postCreate);

router.get('/cart', isAuth, adminControllers.getCart);

router.get('/myList', isAuth, adminControllers.getList);

router.get('/:giftId', isAuth, adminControllers.getGift);

router.get('/edit/:giftId', isAuth, adminControllers.getEdit);

router.post('/edit', isAuth, adminControllers.postEdit);

router.post('/delete', isAuth, adminControllers.postDelete);

module.exports = router;

