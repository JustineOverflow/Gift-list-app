const path = require('path');

const express = require('express');

const createControllers = require('../controllers/create');

const router = express.Router();

//admin/create => GET

router.get('/create', createControllers.getCreate);

//admin/create => POST

router.post('/create', createControllers.postCreate);

module.exports = router;





