const express = require('express');
const router = express.Router();
// Update the import to include loginUser
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser); // <--- Add this line

module.exports = router;