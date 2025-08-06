const express = require('express');
const router = express.Router();

// Sample route - returns a mock user
router.get('/', (req, res) => {
  res.json({ message: 'User route is active' });
});

module.exports = router;
