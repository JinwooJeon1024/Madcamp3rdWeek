const mongoose = require('mongoose');

const widgetDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_auth', required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    type: { type: String, required: true }
}, {collection: 'widgetData' });

const widgetData = mongoose.model('WidgetData', widgetDataSchema);

module.exports = widgetData;
