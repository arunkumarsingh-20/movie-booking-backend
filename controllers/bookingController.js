const { Showtime, Booking } = require('../models/bookingModel');
const Movie = require('../models/movieModel');

// @desc    Create a Showtime (Admin/Staff only)
// @route   POST /api/bookings/showtime
const createShowtime = async (req, res) => {
    try {
        const { movieId, ticketPrice, startDate, totalSeats } = req.body;
        
        const showtime = await Showtime.create({
            MovieId: movieId, // Sequelize automatically looks for 'MovieId'
            ticketPrice,
            startDate,
            totalSeats
        });
        
        res.status(201).json(showtime);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Book a Ticket
// @route   POST /api/bookings
const bookTicket = async (req, res) => {
    try {
        const { showtimeId, seats } = req.body;
        const userId = req.user.id; // Comes from our Middleware

        // 1. Find the showtime
        const showtime = await Showtime.findByPk(showtimeId);

        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        // 2. Check availability
        const availableSeats = showtime.totalSeats - showtime.seatsBooked;
        if (availableSeats < seats) {
            return res.status(400).json({ message: 'Not enough seats available!' });
        }

        // 3. Calculate Cost
        const totalCost = seats * showtime.ticketPrice;

        // 4. Create the Booking
        const booking = await Booking.create({
            UserId: userId,
            ShowtimeId: showtimeId,
            numberOfSeats: seats,
            totalCost
        });

        // 5. Update the Showtime seat count
        // We increment the seatsBooked number
        await showtime.increment('seatsBooked', { by: seats });

        res.status(201).json({ 
            message: 'Booking Successful!', 
            booking 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createShowtime, bookTicket };