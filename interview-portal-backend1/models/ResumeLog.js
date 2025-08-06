const mongoose = require("mongoose");

const resumeLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  parsedRole: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ResumeLog", resumeLogSchema);
