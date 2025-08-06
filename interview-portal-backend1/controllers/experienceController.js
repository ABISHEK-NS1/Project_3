const Experience = require("../models/Experience");

exports.createExperience = async (req, res) => {
  try {
    const { company, role, experienceLevel, questions, tips, mistakes } = req.body;

    const experience = await Experience.create({
      userId: req.user.id,
      company,
      role,
      experienceLevel,
      questions,
      tips,
      mistakes,
    });

    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getUserExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ userId: req.user.id });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getAllExperiences = async (req, res) => {
  try {
    const filters = req.query;
    const experiences = await Experience.find(filters).populate("userId", "name");
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
