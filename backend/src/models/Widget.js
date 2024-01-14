const mongoose = require('mongoose');

const widgetDataSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true }
}, {collection: 'widgetData' });

const widgetData = mongoose.model('WidgetData', widgetDataSchema);

module.exports = widgetData;
