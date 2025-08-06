const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String, // e.g., "Fresher", "1-2 years"
      required: true,
    },
    questions: {
      type: [String],
      default: [],
    },
    tips: {
      type: String,
      default: '',
    },
    mistakes: {
      type: String,
      default: '',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
