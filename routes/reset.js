const express = require('express');
const router = express.Router();
const passport = require('passport');
const resetController = require('../controllers/reset_controller');

router.get('/forgot', resetController.passwordLoad);
router.post('/forgot', resetController.passwordReset);

router.get('/recovery', resetController.recoryMail);
router.post('/recovery', resetController.recoveryPass);


module.exports = router;