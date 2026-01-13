const express = require('express');
const router = express.Router();
const { addMovie, getMovies } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware'); // Import the Bouncer

// Public Route (Anyone can see)
router.get('/', getMovies);

// Protected Route (Only logged in users with token can add)
router.post('/', protect, addMovie); 

module.exports = router;