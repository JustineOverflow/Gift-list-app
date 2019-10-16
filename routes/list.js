const path = require('path');

const express = require("express");

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const gifts = adminData.gifts;
   res.render('myList', {
       gifts: gifts,
       docTitle: 'My list',
       path: '/',
       hasGifts: gifts.length > 0,
   });
});

module.exports = router;