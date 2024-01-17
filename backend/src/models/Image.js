const mongoose = require('mongoose');

const backGroundImageDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user_auth', required: true },
    url: { type: String, required: true }
}, { collection: 'backGroundImageData' });

const ImageData = mongoose.model('ImageData', backGroundImageDataSchema);

module.exports = ImageData;