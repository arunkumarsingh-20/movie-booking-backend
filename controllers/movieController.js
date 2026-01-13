const Movie = require('../models/movieModel');

// @desc    Add a new movie
// @route   POST /api/movies
// @access  Private (Needs Token)
const addMovie = async (req, res) => {
    try {
        const { title, description, genre, duration, posterUrl } = req.body;

        const movie = await Movie.create({
            title,
            description,
            genre,
            duration,
            posterUrl
        });

        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public (Anyone can see movies)
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { addMovie, getMovies };