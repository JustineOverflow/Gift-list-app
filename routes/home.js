const express = require("express");

const router = express.Router();

const homeControllers = require('../controllers/home');

router.get('/', homeControllers.getHome);

router.get('/login', homeControllers.getLog);

router.get('/signup', homeControllers.getSign);

router.post('/signup', homeControllers.postSign);

router.post('/login', homeControllers.postLog);

router.post('/logout', homeControllers.postLogout);

module.exports = router;