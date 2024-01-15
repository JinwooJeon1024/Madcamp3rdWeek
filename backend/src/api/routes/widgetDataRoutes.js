const express = require('express');
const router = express.Router();
const widgetDataControllers = require('../controllers/widgetDataController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/create', verifyToken, widgetDataControllers.createWidgetData);
router.get('/', verifyToken, widgetDataControllers.getWidgetData);
router.put('/update/:id', verifyToken, widgetDataControllers.updateWidgetData);
router.delete('/delete/:id', verifyToken, widgetDataControllers.deleteWidgetData);

module.exports = router;
