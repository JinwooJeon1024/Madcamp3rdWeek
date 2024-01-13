const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true }
}, {collection: 'position' });

const Position = mongoose.model('Position', PositionSchema);

module.exports = Position;
