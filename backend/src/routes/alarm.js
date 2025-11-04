const express = require('express');
const router = express.Router();
const Alarm = require('../models/Alarm');

router.post('/', async (req, res) => {
  try {
    const { serial, type, checked, deviceType } = req.body;
    if (!serial || type == null || deviceType == null) {
      return res.status(400).json({ error: 'serial, type and deviceType are required' });
    }

    const alarm = new Alarm({ serial, type, checked, deviceType });
    await alarm.save();

    const io = req.app.get('io');
    if (io) io.emit('newAlarm', alarm);

    return res.status(201).json(alarm);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 50);
    const filter = {};

    if (req.query.type) filter.type = parseInt(req.query.type);
    if (req.query.deviceType) filter.deviceType = parseInt(req.query.deviceType);

    if (req.query.checked !== undefined) {
      const val = req.query.checked.toLowerCase();
      if (val === 'true' || val === 'false') {
        filter.checked = val === 'true';
      }
    }

    if (req.query.serial) {
      filter.serial = { $regex: req.query.serial, $options: 'i' };
    }

    if (req.query.before || req.query.after || req.query.from || req.query.to) {
      const createdAt = {};
      if (req.query.before) createdAt.$lt = new Date(req.query.before);
      if (req.query.after) createdAt.$gt = new Date(req.query.after);

      if (req.query.from) createdAt.$gte = new Date(req.query.from);
      if (req.query.to) createdAt.$lte = new Date(req.query.to);

      if (Object.keys(createdAt).length > 0) filter.createdAt = createdAt;
    }

    const total = await Alarm.countDocuments(filter);
    const alarms = await Alarm.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return res.json({ total, page, limit, alarms });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
