const express = require("express");
const {
  parseResume,
  managerParseResume,
} = require("../controllers/resume_controller");

const router = express.Router();

router.post("/parseResume", parseResume);
router.post("/managerParseResume", managerParseResume);

module.exports = router;