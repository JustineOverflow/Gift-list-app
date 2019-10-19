const express = require("express");

const router = express.Router();

const homeControllers = require('../controllers/home');

router.get('/', homeControllers.getHome);

router.get('/login', homeControllers.getLog);

router.get('/signup', homeControllers.getSign);

module.exports = router;