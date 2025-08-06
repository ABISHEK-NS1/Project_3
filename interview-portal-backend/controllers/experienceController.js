const Experience = require("../models/Experience");

exports.createExperience = async (req, res) => {
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
  res.json(experience);
};

exports.getAllExperiences = async (req, res) => {
  const filters = req.query;
  const experiences = await Experience.find(filters).populate("userId", "name");
  res.json(experiences);
};

exports.getUserExperiences = async (req, res) => {
  const experiences = await Experience.find({ userId: req.user.id });
  res.json(experiences);
};
