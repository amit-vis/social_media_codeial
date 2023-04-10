const express = require('express');
const router = express.Router();

const postController = ('/post', require('../controllers/post_controllers'));

router.get('/post', postController.post);

module.exports = router;