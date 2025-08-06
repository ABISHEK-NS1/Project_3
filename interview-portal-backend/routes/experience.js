const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleWare.js");
const {
  createExperience,
  getAllExperiences,
  getUserExperiences,
} = require("../controllers/experienceController");

router.post("/", authMiddleware, createExperience);
router.get("/", getAllExperiences);
router.get("/mine", authMiddleware, getUserExperiences);

module.exports = router;
