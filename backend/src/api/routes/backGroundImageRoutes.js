const express = require('express');
const router = express.Router();
const backGroundImageController = require('../controllers/backGroundImageController');
const verifyToken = require('../middlewares/verifyToken');

router.put('/update', verifyToken, backGroundImageController.updateImage);
router.post('/', verifyToken, backGroundImageController.fetchImage)

module.exports = router;
