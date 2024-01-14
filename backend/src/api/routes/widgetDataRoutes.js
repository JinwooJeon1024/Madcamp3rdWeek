const express = require('express');
const router = express.Router();
const widgetDataControllers = require('../controllers/widgetDataControllers');

router.get('/get', widgetDataControllers.getWidgetData);
router.post('/save', widgetDataControllers.saveWidgetData);
router.post('/add', widgetDataControllers.addWidgetData);

module.exports = router;
