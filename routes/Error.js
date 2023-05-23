const express = require('express');
const router = express.Router();

const errorController = require('../controllers/Error_controller');

router.get('/Error', errorController.Error);

module.exports = router