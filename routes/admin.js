const path = require('path');

const express = require('express');

const router = express.Router();

const gifts = [];

router.get('/create', (req, res, next) => {
    res.render('create.ejs', {
        pageTitle: 'Add a gift',
    });
});

router.post('/create', (req, res, next) => {
    gifts.push(req.body);
    res.redirect('/');
});

exports.routes = router;
exports.gifts = gifts;





