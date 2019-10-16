const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/create', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'create.html'));
});

router.post('/create', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;





