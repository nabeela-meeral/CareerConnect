const express = require('express');
const router = express.Router();
const { suggestSkills } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/suggest-skills', protect, suggestSkills);

module.exports = router;
