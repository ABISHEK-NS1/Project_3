const express = require("express");
const router = express.Router();
const { uploadResumeData, getRelevantExperiences } = require("../controllers/resumeController");
const protect = require("../middlewares/protect");

router.post("/", protect, uploadResumeData);
router.get("/suggestions", protect, getRelevantExperiences);

module.exports = router;
