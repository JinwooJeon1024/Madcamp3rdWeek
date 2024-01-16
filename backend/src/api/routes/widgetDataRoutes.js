const express = require('express');
const router = express.Router();
const widgetDataControllers = require('../controllers/widgetDataController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/create', verifyToken, widgetDataControllers.createWidgetData);
router.get('/', verifyToken, widgetDataControllers.getAllWidgetData);
router.put('/update', verifyToken, widgetDataControllers.replaceAllWidgetData);

module.exports = router;
