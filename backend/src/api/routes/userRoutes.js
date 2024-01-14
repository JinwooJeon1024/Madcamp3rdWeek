const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/userinfo', verifyToken, userController.getUserInfo);

module.exports = router;
