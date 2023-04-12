//call the express for the router
const express = require('express');

const router = express.Router();

//here is the call home controller through the controller file
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/likes', require('./likes'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));

//for any further routes access from here
//router.use('/routerName', require('./routerFileName'))

// router.get('/process', homeController.process)

// router.get('/profile', homeController.profile);



module.exports = router;