const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: String,
  role: String,
  experienceLevel: String,
  questions: [String],
  tips: String,
  mistakes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Experience", experienceSchema);
