const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');
const Movie = require('./movieModel');

// 1. The Showtime Table (When is the movie playing?)
const Showtime = sequelize.define('Showtime', {
    ticketPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE, // e.g., 2026-01-20 19:00:00
        allowNull: false
    },
    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seatsBooked: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

// 2. The Booking Table (Who bought tickets?)
const Booking = sequelize.define('Booking', {
    numberOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalCost: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// 3. Define Relationships (The Glue)
// A Movie has many Showtimes
Movie.hasMany(Showtime);
Showtime.belongsTo(Movie);

// A User has many Bookings
User.hasMany(Booking);
Booking.belongsTo(User);

// A Showtime has many Bookings
Showtime.hasMany(Booking);
Booking.belongsTo(Showtime);

module.exports = { Showtime, Booking };