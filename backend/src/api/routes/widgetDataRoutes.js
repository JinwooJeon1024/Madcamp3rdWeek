const express = require('express');
const router = express.Router();
const widgetDataControllers = require('../controllers/widgetDataControllers');

router.post('/create', widgetDataControllers.createWidgetData);
router.get('/', widgetDataControllers.getWidgetData);
router.put('/update/:id', widgetDataControllers.updateWidgetData);
router.delete('/delete/:id', widgetDataControllers.deleteWidgetData);

module.exports = router;
