const ResumeLog = require("../models/ResumeLog");
const Experience = require("../models/Experience");

exports.uploadResumeData = async (req, res) => {
  try {
    const { skills, parsedRole, experienceYears } = req.body;

    const log = await ResumeLog.create({
      userId: req.user.id,
      skills,
      parsedRole,
      experienceYears,
    });

    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getRelevantExperiences = async (req, res) => {
  try {
    const lastResume = await ResumeLog.findOne({ userId: req.user.id }).sort({ timestamp: -1 });
    if (!lastResume) return res.status(404).json({ error: "No resume data found" });

    const regex = new RegExp(lastResume.parsedRole, "i");
    const relevantExperiences = await Experience.find({
      role: regex,
    });

    res.json(relevantExperiences);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
