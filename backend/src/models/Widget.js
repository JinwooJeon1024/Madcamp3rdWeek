const mongoose = require('mongoose');

const widgetDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_auth', required: true },
    properties: { type: Object, required: true } 
}, { collection: 'widgetData' });

const WidgetData = mongoose.model('WidgetData', widgetDataSchema);

module.exports = WidgetData;
