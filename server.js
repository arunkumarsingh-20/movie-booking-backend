const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const Movie = require('./models/movieModel'); // Ensure table creation
const { Showtime, Booking } = require('./models/bookingModel');
const bookingRoutes = require('./routes/bookingRoutes');

// Import Routes and Models
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel'); // Importing this ensures the table is created

dotenv.config();
const app = express();

app.use(express.json()); // Allows receiving JSON data
app.use(cors());

// Mount the Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        
        // Sync Database (creates tables if they don't exist)
        await sequelize.sync({ force: false });
        console.log('✅ Database synchronized (Tables created).');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();