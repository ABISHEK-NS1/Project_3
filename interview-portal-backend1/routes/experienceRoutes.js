const express = require("express");
const router = express.Router();
const { createExperience, getAllExperiences, getUserExperiences } = require("../controllers/experienceController");
const protect = require("../middlewares/protect");

router.post("/", protect, createExperience);
router.get("/my", protect, getUserExperiences);
router.get("/", getAllExperiences);

module.exports = router;
