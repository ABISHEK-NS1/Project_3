const express = require('express');
const router = express.Router();
const ResumeLog = require('../models/ResumeLog');
const authMiddleware = require('../middlewares/authMiddleWare.js');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { skills, parsedRole, experienceYears } = req.body;

    if (!skills || !parsedRole || typeof experienceYears !== 'number') {
      return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    const resumeLog = new ResumeLog({
      userId: req.user.id,
      skills,
      parsedRole,
      experienceYears,
    });

    await resumeLog.save();
    res.status(201).json({ message: 'Resume log saved successfully', resumeLog });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.get('/latest', authMiddleware, async (req, res) => {
  try {
    const latestLog = await ResumeLog.findOne({ userId: req.user.id })
      .sort({ timestamp: -1 });

    if (!latestLog) {
      return res.status(404).json({ message: 'No resume log found' });
    }

    res.json(latestLog);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
