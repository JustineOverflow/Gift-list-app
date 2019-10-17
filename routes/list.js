const path = require('path');

const express = require("express");

const router = express.Router();

const createControllers = require('../controllers/create');

router.get('/', createControllers.getList);

module.exports = router;