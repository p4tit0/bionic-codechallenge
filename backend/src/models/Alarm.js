const mongoose = require('mongoose');

const AlarmSchema = new mongoose.Schema({
  serial: { type: String, required: true },
  type: { type: Number, required: true },
  checked: { type: Boolean, default: false },
  deviceType: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alarm', AlarmSchema);
