const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Accessible only by admins
router.get('/admin', auth(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

// Accessible by any authenticated user
router.get('/user', auth(['user', 'admin']), (req, res) => {
  res.json({ message: 'User access granted' });
});

module.exports = router;
