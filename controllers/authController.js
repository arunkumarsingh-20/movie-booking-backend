const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if all fields exist
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // 2. Check if user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 5. Send response (excluding password)
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: "User registered successfully!"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const jwt = require('jsonwebtoken'); // Import JWT at the top!

// Helper function to generate a Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token lasts for 30 days
    });
};

// @desc    Login user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check for user email
        const user = await User.findOne({ where: { email } });

        // 2. Check password (compare plain text with hashed DB password)
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id), // <--- Giving the wristband!
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };