
const express = require('express');
const router = express.Router();
const backGroundImageController = require('../controllers/backGroundImageController');

router.put('/update', backGroundImageController.updateImage);
router.post('/', backGroundImageController.fetchImage)

module.exports = router;
