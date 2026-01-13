const express = require('express');
const router = express.Router();
const { createShowtime, bookTicket } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Only logged in users can do this
router.post('/showtime', protect, createShowtime);
router.post('/', protect, bookTicket);

module.exports = router;