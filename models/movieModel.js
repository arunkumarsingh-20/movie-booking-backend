const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT, // TEXT is for longer strings
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER, // in minutes
        allowNull: false
    },
    posterUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Movie;