/*const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const ResumeLog = require('../models/ResumeLog');

router.post('/', authenticateToken, async (req, res) => {
    try {
        const newLog = new ResumeLog({ ...req.body, userId: req.user });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;*/

const mongoose = require("mongoose");

const resumeLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skills: [String],
  parsedRole: String,
  experienceYears: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ResumeLog", resumeLogSchema);

