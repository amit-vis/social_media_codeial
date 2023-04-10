const express = require('express');

const router = express.Router();

const userLikes = require('../controllers/users_likes');

router.get('/likes', userLikes.likes);

module.exports = router;