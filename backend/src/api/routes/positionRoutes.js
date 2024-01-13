const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');

router.get('/get', positionController.getPosition);
router.post('/save', positionController.savePosition);

module.exports = router;
